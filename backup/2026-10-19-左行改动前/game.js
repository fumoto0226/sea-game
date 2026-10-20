'use strict';
// Data reference: Cookie Clicker live web main.js, retrieved 2026-10-18.
// Only the first five buildings and early double-efficiency upgrades are included.
const BUILDINGS=[
 {name:'瘦弱鱼人',original:'Cursor',icon:'img/svg/fisher-thin.svg',price:15,cps:.1},
 {name:'兼职鱼人',original:'Grandma',icon:'img/svg/fisher-parttime.svg',price:100,cps:1},
 {name:'鱼人社员',original:'Farm',icon:'img/svg/fisher-staff.svg',price:1100,cps:8},
 {name:'鱼巨人',original:'Mine',icon:'img/svg/fisher-giant.svg',price:12000,cps:47},
 {name:'变异鱼人',original:'Factory',icon:'img/svg/fisher-mutant.svg',price:130000,cps:260}
];
const UPGRADES=[
 {id:'finger',name:'强化食指',original:'Reinforced index finger',building:0,need:1,price:100},
 {id:'cream',name:'腕管保护霜',original:'Carpal tunnel prevention cream',building:0,need:1,price:500},
 {id:'hands',name:'左右开弓',original:'Ambidextrous',building:0,need:10,price:10000},
 ...[['奶奶的来信','钢制擀面杖'],['廉价锄头','肥料'],['糖气','巨型钻头'],['加固传送带','童工']].flatMap((names,k)=>names.map((name,j)=>({id:`tier-${k+1}-${j}`,name,building:k+1,need:[1,5][j],price:BUILDINGS[k+1].price*[10,50][j]})))
];
const PRIZES=[{name:'晴空铭牌',color:'#b8e3ff',icon:'☁'},{name:'花园铭牌',color:'#d7efba',icon:'♧'},{name:'落日铭牌',color:'#ffd3b1',icon:'☀'}];
const KEY='apple-works-demo-v1',$=id=>document.getElementById(id);
const fresh=()=>({apples:0,total:0,owned:[0,0,0,0,0],upgrades:[],prizes:[0,0,0],draws:0,events:freshEvents()});
let state=fresh(),bulk=1,displayed=0,last=null,saveClock=0,toastTimer,returnFocus;
try{const data=JSON.parse(localStorage.getItem(KEY));if(data?.version===1){const v=data.state;if(Number.isFinite(v.apples)&&v.apples>=0&&Array.isArray(v.owned)&&v.owned.length===5&&v.owned.every(n=>Number.isInteger(n)&&n>=0)){state={...fresh(),...v,upgrades:(v.upgrades||[]).filter(id=>UPGRADES.some(u=>u.id===id))};
// Temporary bonuses expire in real time, before the first render. Legacy saves
// have no trustworthy deadline, so discard only their temporary frenzy.
state.events={...freshEvents(),...state.events,frenzy:Number.isFinite(data.frenzyExpiresAt)?Math.max(0,Math.min(60,(data.frenzyExpiresAt-Date.now())/1000)):0};}}}catch{}
state.events={...freshEvents(),...state.events};
displayed=state.apples;
// Like the reference, abbreviate from one million; keep smaller balances whole.
function formatNumber(n,decimals=0){
 if(!Number.isFinite(n))return '∞';
 const magnitude=Math.abs(n),units=['M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc'];
 if(magnitude<1e6)return (decimals?Number(n.toFixed(decimals)):Math.floor(n)).toLocaleString('en-US');
 let tier=Math.min(Math.floor(Math.log10(magnitude)/3)-2,units.length-1),value=n/10**(6+tier*3);
 if(Math.abs(Number(value.toFixed(2)))>=1000&&tier<units.length-1){tier++;value/=1000}
 return Number(value.toFixed(2)).toLocaleString('en-US')+' '+units[tier];
}
// Top counter keeps up to nine integer digits before promoting its unit.
function totalNumber(n){
 if(!Number.isFinite(n))return '∞';
 const units=['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc'];let value=Math.max(0,n),unit=0;
 while(value>=1e9&&unit<units.length-1){value/=1000;unit++}
 return Math.floor(value).toLocaleString('en-US')+(unit?' '+units[unit]:'');
}
const number=n=>formatNumber(n),precise=n=>formatNumber(n,1);
const multiplier=i=>2**UPGRADES.filter(u=>u.building===i&&state.upgrades.includes(u.id)).length;
const clickPower=()=>multiplier(0)*(state.events.frenzy>0?7:1);
const baseCps=()=>BUILDINGS.reduce((sum,b,i)=>sum+b.cps*state.owned[i]*multiplier(i),0);
const cps=()=>baseCps()*(state.events.frenzy>0?7:1);
// Original bulk pricing sums unrounded prices, then rounds the complete batch up.
function buildingCost(i,n=bulk){let sum=0;for(let k=0;k<n;k++)sum+=BUILDINGS[i].price*1.15**(state.owned[i]+k);return Math.ceil(sum)}
// Official web rule: reveal at lifetime earnings >= base price; preview two locked rows.
const visible=i=>state.owned[i]>0||state.total>=BUILDINGS[i].price;
const unlocked=u=>state.owned[u.building]>=u.need;
const offers=()=>UPGRADES.filter(u=>unlocked(u)&&!state.upgrades.includes(u.id)).sort((a,b)=>a.price-b.price);
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,state,frenzyExpiresAt:state.events.frenzy>0?Date.now()+state.events.frenzy*1000:0}))}catch{}}
function notify(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2000)}
function earn(amount){state.apples+=amount;state.total+=amount}
function spend(amount){if(state.apples+1e-9<amount)return false;state.apples=Math.max(0,state.apples-amount);displayed=state.apples;return true}
// Consecutive successful purchases belong to one batch until 2s of silence.
let purchaseSpeechLast=-Infinity,purchaseSpeechTimer,purchaseSpeechFrame=0;
const PURCHASE_SPEECH='哦，又来新人了。';
function drawSpeechOutline(progress){
 const left=30.5,right=78+331.5*progress,r=Math.min(20,(right-left)/2),bottom=84.5;
 $('speechPath').setAttribute('d',`M${left+r} .5H${right-r}Q${right} .5 ${right} ${r+.5}V${bottom-r}Q${right} ${bottom} ${right-r} ${bottom}H${left+r}Q${left} ${bottom} ${left} ${bottom-r}V39L.5 26L${left} 25V${r+.5}Q${left} .5 ${left+r} .5Z`);
}
function animatePurchaseSpeech(){
 cancelAnimationFrame(purchaseSpeechFrame);purchaseSpeechFrame=0;
 const text=$('speechText');
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){drawSpeechOutline(1);text.textContent=PURCHASE_SPEECH;return}
 text.textContent='';drawSpeechOutline(0);
 const start=performance.now();
 const step=now=>{
  const elapsed=Math.max(0,now-start),progress=Math.min(1,elapsed/360);
  drawSpeechOutline(1-(1-progress)**3);
  text.textContent=PURCHASE_SPEECH.slice(0,Math.max(0,Math.floor((elapsed-100)/60)));
  if(elapsed<100+PURCHASE_SPEECH.length*60)purchaseSpeechFrame=requestAnimationFrame(step);else purchaseSpeechFrame=0;
 };
 purchaseSpeechFrame=requestAnimationFrame(step);
}
function greetPurchase(){
 const now=performance.now(),newBatch=now-purchaseSpeechLast>=2000;purchaseSpeechLast=now;
 if(!newBatch)return;
 const speech=$('purchaseSpeech');speech.hidden=false;animatePurchaseSpeech();talkOnce();
 clearTimeout(purchaseSpeechTimer);purchaseSpeechTimer=setTimeout(()=>speech.hidden=true,2700);
}
function resetPurchaseSpeech(){talkPending=false;clearTimeout(purchaseSpeechTimer);cancelAnimationFrame(purchaseSpeechFrame);purchaseSpeechFrame=0;purchaseSpeechLast=-Infinity;$('purchaseSpeech').hidden=true}
function buyBuilding(i){if(!visible(i)||!spend(buildingCost(i)))return false;state.owned[i]+=bulk;greetPurchase();queueGuests(bulk);save();render();notify(`${BUILDINGS[i].name} +${bulk} · 每秒 ${precise(cps())} 苹果`);return true}
function buyUpgrade(id){const u=UPGRADES.find(x=>x.id===id);if(!u||!unlocked(u)||state.upgrades.includes(id)||!spend(u.price))return false;state.upgrades.push(id);save();render();notify(u.name+' · 效率翻倍');return true}
function clickEffects(event,n){
 const r=$('produce').getBoundingClientRect(),scale=document.querySelector('.phone').clientWidth/400;
 const pointer=event&&event.detail>0&&Number.isFinite(event.clientX);
 const x=pointer?event.clientX:r.left+r.width/2,y=pointer?event.clientY:r.top+r.height/2;
 const f=document.createElement('span');f.className='click-number';if(state.events.frenzy>0){f.classList.add('frenzy-number');const glyph=document.createElement('span');glyph.className='reward-impact';glyph.textContent='+'+number(n);f.append(glyph)}else f.textContent='+'+number(n);
 f.style.left=x+(Math.random()-.5)*6+'px';f.style.top=y-22*scale+'px';f.style.fontSize=Math.max(16,26*scale)+'px';const duration=(1550+Math.random()*180)/1.2;const startSpeed=90/1.05*1.2,time=duration/1000,distance=startSpeed*time+55*scale;f.style.setProperty('--rise-distance',distance+'px');const slope=startSpeed*time/distance;f.style.setProperty('--rise-ease',`cubic-bezier(.333333,${slope/3},.666667,${(1+slope)/3})`);f.style.animationDuration=duration+'ms';$('fx').append(f);setTimeout(()=>f.remove(),duration+60);
 {const apple=document.createElement('span');apple.className='click-apple';const img=document.createElement('img');img.src=state.events.frenzy>0?'img/svg/apple-gold.svg?v=frenzy16':'img/svg/apple.svg';img.alt='';img.draggable=false;apple.append(img);apple.style.left=x+'px';apple.style.top=y+'px';apple.style.width=36*scale+'px';apple.style.setProperty('--travel',(Math.random()<.5?-1:1)*(45+Math.random()*90)*scale+'px');apple.style.setProperty('--fall',220*scale+'px');apple.style.setProperty('--spin',(Math.random()<.5?-1:1)*(220+Math.random()*240)+'deg');$('fx').append(apple);setTimeout(()=>apple.remove(),1050)}
 while($('fx').children.length>120)$('fx').firstElementChild.remove();
}
// Original synthesized tactile click; no third-party audio assets.
let clickAudio=null;
function playClickSound(){
 try{
  const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return;
  if(!clickAudio)clickAudio=new AudioEngine();
  if(clickAudio.state==='suspended')clickAudio.resume().catch(()=>{});
  const now=clickAudio.currentTime,duration=.045;
  const noise=clickAudio.createBuffer(1,Math.ceil(clickAudio.sampleRate*duration),clickAudio.sampleRate);
  const samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*Math.exp(-i/(clickAudio.sampleRate*.008));
  const source=clickAudio.createBufferSource();source.buffer=noise;
  const filter=clickAudio.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1800+Math.random()*350;filter.Q.value=.7;
  const gain=clickAudio.createGain();gain.gain.setValueAtTime(.2,now);gain.gain.exponentialRampToValueAtTime(.001,now+duration);
  source.connect(filter);filter.connect(gain);gain.connect(clickAudio.destination);source.start(now);source.stop(now+duration);
  const body=clickAudio.createOscillator(),bodyGain=clickAudio.createGain();body.frequency.setValueAtTime(260,now);body.frequency.exponentialRampToValueAtTime(120,now+.035);bodyGain.gain.setValueAtTime(.045,now);bodyGain.gain.exponentialRampToValueAtTime(.001,now+.04);body.connect(bodyGain);bodyGain.connect(clickAudio.destination);body.start(now);body.stop(now+.045);
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect()};body.onended=()=>{body.disconnect();bodyGain.disconnect()};
 }catch{}
}
let productionTap=null;
function animateProductionPress(){
 if(state.events.frenzy<=0||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 productionTap?.cancel();productionTap=$('produce').animate([{transform:'scale(.86)'},{transform:'scale(1.13)',offset:.42},{transform:'scale(1)'}],{duration:240,easing:'cubic-bezier(.18,.8,.3,1)'});productionTap.id='golden-click-impact';
}
function produce(event){animateProductionPress();playClickSound();const n=clickPower();earn(n);clickEffects(event,n);render()}

function draw(){if(!spend(50))return;const i=Math.min(2,Math.floor(Math.random()*3));state.prizes[i]++;state.draws++;save();render();$('drawResult').textContent=`获得「${PRIZES[i].name}」· 已拥有 ${state.prizes[i]} 枚`;notify('扭蛋开启 · '+PRIZES[i].name)}
$('buildings').innerHTML=BUILDINGS.map((b,i)=>`<button class="building" data-building="${i}"><span class="tile"><span class="owned"></span><span class="icon"><img src="${b.icon}" alt="" draggable="false"><span class="unknown-icon">?</span></span><span class="label"></span></span><span class="cost"><img src="img/svg/apple2.svg" alt="苹果" draggable="false"><span></span></span><span class="gain"></span></button>`).join('');
$('upgrades').innerHTML=UPGRADES.map(u=>`<div class="upgrade" id="up-${u.id}"><span class="up-icon"><img src="${BUILDINGS[u.building].icon}" alt=""></span><div class="up-copy"><b>${u.name}</b><small>${u.building===0?'点击与光标':'所有'+BUILDINGS[u.building].name}效率 ×2</small></div><button data-upgrade="${u.id}"></button></div>`).join('')+'<p class="empty" id="emptyShop"></p>';
$('prizes').innerHTML=PRIZES.map((p,i)=>`<div class="prize" style="background:${p.color}"><strong>${p.icon}</strong>${p.name}<div id="prize-${i}"></div></div>`).join('');
// Reference base Golden Cookie timing: 30 trials/sec, hazard ((t-300)/600)^5.
// This demo restricts outcomes to Lucky and Frenzy; Frenzy duration is customized to 60s.
function freshEvents(){return {elapsed:0,carry:0,active:null,lastKind:null,frenzy:0}}
function chooseEventKind(){const last=state.events.lastKind;if(last&&Math.random()<.8)return last==='lucky'?'golden':'lucky';return Math.random()<.5?'lucky':'golden'}
function spawnSpecial(kind=chooseEventKind()){
 const e=state.events;let x,y;
 for(let i=0;i<30;i++){x=.10+Math.random()*.79;y=.24+Math.random()*.32;if(!(x<.30&&y>.38)&&!(x>.73&&y>.49)&&!(x>.66&&y<.36))break}
 e.active={kind,x,y,remaining:13};e.elapsed=0;e.carry=0;save();render();return e.active;
}
function updateEvents(dt){
 const e=state.events;e.frenzy=Math.max(0,e.frenzy-dt);if(e.frenzy<1e-8)e.frenzy=0;
 if(e.active){e.active.remaining=Math.max(0,e.active.remaining-dt);if(e.active.remaining<1e-8){e.active=null;e.elapsed=0;e.carry=0}return}
 e.carry+=dt;
 while(e.carry+1e-9>=1/30){e.carry=Math.max(0,e.carry-1/30);e.elapsed+=1/30;
  if(e.elapsed>=900||(e.elapsed>300&&Math.random()<((e.elapsed-300)/600)**5)){spawnSpecial();break}
 }
}
function specialBurst(kind,amount,x,y){
 const rect=document.querySelector('.phone').getBoundingClientRect(),px=rect.left+x*rect.width,py=rect.top+y*rect.height;
 const label=document.createElement('div');label.className='special-reward';label.textContent=kind==='lucky'?'幸运！ +'+number(amount)+' 苹果':'黄金狂热！ 产量 ×7';label.style.left=px+'px';label.style.top=py+'px';$('fx').append(label);setTimeout(()=>label.remove(),1900);
 const ring=document.createElement('i');ring.className='special-ring';ring.style.left=px+'px';ring.style.top=py+'px';$('fx').append(ring);setTimeout(()=>ring.remove(),900);
 for(let i=0;i<26;i++){const part=document.createElement('img');part.className='special-spark';part.src='img/svg/apple-gold.svg?v=frenzy16';part.alt='';part.draggable=false;part.style.left=px+'px';part.style.top=py+'px';const angle=Math.PI*2*i/26;part.style.setProperty('--dx',Math.cos(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--dy',Math.sin(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--spin',Math.random()*360+'deg');$('fx').append(part);setTimeout(()=>part.remove(),1200)}
}
function collectSpecial(){
 const e=state.events,apple=e.active;if(!apple)return false;
 e.active=null;e.elapsed=0;e.carry=0;e.lastKind=apple.kind;let amount=0;
 if(apple.kind==='lucky'){amount=Math.min(state.apples*.15,cps()*900)+13;earn(amount)}else e.frenzy=60;
 specialBurst(apple.kind,amount,apple.x,apple.y);playClickSound();save();render();return true;
}
let rainCarry=0;
function updateGoldRain(dt){
 if(state.events.frenzy<=0)return;rainCarry+=dt;
 while(rainCarry>=.13){rainCarry-=.13;const drop=document.createElement('img');drop.className='rain-apple';drop.src='img/svg/apple-gold.svg?v=frenzy16';drop.alt='';drop.draggable=false;drop.style.left=(Math.random()*95)+'%';drop.style.width=(3+Math.random()*4)+'cqw';drop.style.setProperty('--rain-drift',(Math.random()-.5)*100+'px');drop.style.setProperty('--rain-turn',(Math.random()-.5)*500+'deg');drop.style.animationDuration=(2.5+Math.random()*1.3)+'s';$('goldRain').append(drop);drop.onanimationend=()=>drop.remove();setTimeout(()=>drop.remove(),4000);while($('goldRain').children.length>32)$('goldRain').firstElementChild.remove()}
}
let sentGoldenDance=null;
function syncGoldenDance(active){
 const frame=document.querySelector('.fish-character');if(sentGoldenDance===active||!frame?.contentWindow)return;
 try{if(typeof frame.contentWindow.setGoldenDance==='function')frame.contentWindow.setGoldenDance(active);else frame.contentWindow.postMessage({type:'apple-works:golden-dance',active},location.protocol==='file:'?'*':location.origin);sentGoldenDance=active}catch{sentGoldenDance=null}
}
document.querySelector('.fish-character').addEventListener('load',()=>{sentGoldenDance=null;try{document.querySelector('.fish-character').contentWindow.setCharacterLook({skin:'milk-frog',helmet:null})}catch{}syncGoldenDance(state.events.frenzy>0)});
// The resident fishman speaks: one of the three talking motions, picked at random.
// The fishman talks while its speech bubble is up. A request made before the
// character document has finished loading is kept until it can be played.
let talkPending=false;
function talkOnce(){talkPending=true}
function driveTalk(dt){
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish)return;
 try{
  if(talkPending&&typeof fish.playTalk==='function'&&fish.playTalk())talkPending=false;
  fish.advanceTalk?.(dt);
 }catch{}
}
function driveGoldenDance(dt){
 try{const advance=document.querySelector('.fish-character')?.contentWindow?.advanceGoldenDance;if(typeof advance==='function')advance(dt,state.events.frenzy>0)}catch{}
}
function renderEvents(){
 const e=state.events,active=e.active,layer=$('specialLayer'),glow=$('specialGlow');
 glow.hidden=!active;if(active){glow.dataset.kind=active.kind;glow.style.left=active.x*100+'%';glow.style.top=active.y*100+'%';glow.style.opacity=String(Math.min(1,active.remaining/1.2))}
 if(active){let button=$('specialApple');if(!button){button=document.createElement('button');button.id='specialApple';button.className='special-apple';button.innerHTML='<img draggable="false" alt="">';button.onclick=collectSpecial;layer.append(button)}
  button.dataset.kind=active.kind;button.style.left=active.x*100+'%';button.style.top=active.y*100+'%';button.style.opacity=String(Math.min(1,active.remaining/1.2));button.setAttribute('aria-label',(active.kind==='lucky'?'幸运苹果，领取即时奖励':'金苹果，开启60秒七倍点击与自动产量'));
  const src=active.kind==='golden'?'img/svg/apple-gold.svg?v=frenzy16':'img/svg/apple.svg';if(button.querySelector('img').getAttribute('src')!==src)button.querySelector('img').src=src;
 }else layer.replaceChildren();
 const boosted=e.frenzy>0,remaining=e.frenzy/60*100,balance=document.querySelector('.balance'),ring=$('frenzyRing');
 const countdown=$('frenzyCountdown');countdown.hidden=!boosted;
 if(boosted){const label=`剩余 ${e.frenzy.toFixed(2)}s`;if(countdown.textContent!==label)countdown.textContent=label}
 syncGoldenDance(boosted);
 document.querySelector('.phone').classList.toggle('golden-frenzy',boosted);$('frenzyBadge').hidden=!boosted;ring.toggleAttribute('hidden',!boosted);
 const phone=document.querySelector('.phone'),phoneBox=phone.getBoundingClientRect(),buttonBox=$('produce').getBoundingClientRect();phone.style.setProperty('--aura-x',(buttonBox.left+buttonBox.width/2-phoneBox.left)+'px');phone.style.setProperty('--aura-y',(buttonBox.top+buttonBox.height/2-phoneBox.top)+'px');
 if(!boosted){$('goldRain').replaceChildren();rainCarry=0;productionTap?.cancel();productionTap=null}
 balance.style.setProperty('--buff-progress',remaining+'%');
 if(boosted){
  $('frenzyBadge').setAttribute('aria-label','黄金狂热，产能乘以七');
  ring.setAttribute('aria-valuenow',e.frenzy.toFixed(1));
  const bounds=balance.getBoundingClientRect(),border=parseFloat(getComputedStyle(balance).borderTopWidth),w=bounds.width-2*border,h=bounds.height-2*border,key=w+':'+h;
  if(ring.dataset.size!==key){
   ring.dataset.size=key;ring.setAttribute('viewBox',`0 0 ${w} ${h}`);
   const outer=getComputedStyle(balance),inner=getComputedStyle(balance,'::before'),gap=parseFloat(inner.left),innerBorder=parseFloat(inner.borderTopWidth),p=gap/2;
   const outerR=parseFloat(outer.borderTopLeftRadius)-parseFloat(outer.borderTopWidth),innerR=parseFloat(inner.borderTopLeftRadius),r=(outerR+innerR)/2;
   for(const [id,x,y,width,height,radius] of [['ringOuter',-1,-1,w+2,h+2,outerR+1],['ringInner',gap+innerBorder,gap+innerBorder,w-2*(gap+innerBorder),h-2*(gap+innerBorder),innerR-innerBorder]]){const el=$(id);for(const [key,value] of Object.entries({x,y,width,height,rx:radius}))el.setAttribute(key,value)}
   $('frenzyRingPath').style.strokeWidth=(gap*2+4)+'px';
   // Start just past the apple's covered lower-left corner, then head up
   // around that corner and clockwise along the top edge.
   const markRight=balance.querySelector('.apple-mark').getBoundingClientRect().right-bounds.left-border;
   const startX=Math.max(p+r,markRight+1);
   $('frenzyRingPath').setAttribute('d',`M${startX} ${h-p} H${p+r} A${r} ${r} 0 0 1 ${p} ${h-p-r} V${p+r} A${r} ${r} 0 0 1 ${p+r} ${p} H${w-p-r} A${r} ${r} 0 0 1 ${w-p} ${p+r} V${h-p-r} A${r} ${r} 0 0 1 ${w-p-r} ${h-p} H${startX} Z`)
  }
  $('frenzyRingPath').style.strokeDasharray=remaining+' 100';
  // Advance the empty section clockwise; the last gold ends at the start.
  $('frenzyRingPath').style.strokeDashoffset=String(remaining-100);
 }

}

// DEMO: summon a guest fishman. It enters from off-stage right, walks left to a
// random spot in the open floor, waves, then walks backwards out the way it came
// without turning round. Up to GUEST_LIMIT at once; further clicks do nothing.
// Each one gets its own entry delay, pace and spot so a burst of clicks does not
// send out a single column of identical fishmen.
// Their frames reuse the embedded character document, so they need the same srcdoc.
const guests=[];
// GUEST_START puts the frame just far enough right that the fishman drawn
// inside it is off the phone's edge, so a click shows a step almost at once.
const GUEST_LIMIT=8,GUEST_START=92,GUEST_MIN=34,GUEST_MAX=76,GUEST_GAP=7;
function guestTarget(){
 for(let tries=0;tries<16;tries++){
  const spot=GUEST_MIN+Math.random()*(GUEST_MAX-GUEST_MIN);
  if(!guests.some(guest=>Math.abs(guest.target-spot)<GUEST_GAP))return spot;
 }
 return GUEST_MIN+Math.random()*(GUEST_MAX-GUEST_MIN);
}
// Building the frame and loading the character document costs a few hundred
// milliseconds, which on the first click reads as the button lagging. One spare
// frame is therefore kept loaded off-stage, handed over the moment it is asked
// for, and replaced straight away for the next click.
let spareGuestFrame=null;
function makeGuestFrame(){
 const wrap=document.createElement('div');
 wrap.className='fish-guest';wrap.setAttribute('aria-hidden','true');
 const shadow=document.createElement('div');shadow.className='fish-guest-shadow';
 const frame=document.createElement('iframe');
 frame.title='来访的鱼人';frame.setAttribute('scrolling','no');frame.setAttribute('aria-hidden','true');
 wrap.append(shadow,frame);
 wrap.style.setProperty('--guest-x',GUEST_START+'%');
 wrap.dataset.ready='';
 // Kept rendered but invisible while spare, so its document is warm on the first click.
 wrap.style.visibility='hidden';
 frame.addEventListener('load',()=>{try{frame.contentWindow.setGuestLook();wrap.dataset.ready='1'}catch{}});
 document.querySelector('.phone').append(wrap);
 frame.srcdoc=window.CHARACTER_SRCDOC;
 return wrap;
}
function prepareGuestFrame(){
 if(!spareGuestFrame&&window.CHARACTER_SRCDOC)spareGuestFrame=makeGuestFrame();
}
// Every building purchase sends that many ordinary fishmen on stage. Only GUEST_LIMIT fit at once,
// so the rest wait here and walk on as earlier ones leave.
let guestQueue=0;
function queueGuests(count){guestQueue+=count}
// Building a frame parses the whole character document, so the queue releases
// one at a time with a gap between them. Letting ten start in a single tick is
// what made a bulk purchase stutter.
let guestReleaseWait=0;
function drainGuestQueue(dt){
 guestReleaseWait-=dt;
 if(guestQueue<=0||guestReleaseWait>0||guests.length>=GUEST_LIMIT)return;
 if(summonGuest()){guestQueue--;guestReleaseWait=.3}
}
function summonGuest(){
 if(!window.CHARACTER_SRCDOC||guests.length>=GUEST_LIMIT)return false;
 const frame=guestPool.pop()||spareGuestFrame||makeGuestFrame();
 if(frame===spareGuestFrame)spareGuestFrame=null;
 frame.style.visibility='visible';
 const waiting=guests.filter(guest=>guest.phase==='wait'||guest.phase==='in').length;
 const depth=Math.random()*5-2;
 const entry={frame,x:GUEST_START,target:guestTarget(),phase:'wait',clock:0,
  // The first one off the mark leaves at once; the queue's own release gap
  // spaces the rest out, so each only needs a small random extra.
  delay:waiting?Math.random()*.3:0,
  speed:23+Math.random()*8,hold:.2+Math.random()*.7};
 frame.style.setProperty('--guest-x',GUEST_START+'%');
 // A little depth offset so two fishmen standing near each other do not overlap
 // exactly. The lower one stands nearer the camera, so it is drawn in front.
 frame.style.setProperty('--guest-y',depth.toFixed(2)+'%');
 frame.style.zIndex=String(3+Math.round((depth+2)*10));
 guests.push(entry);
 (window.requestIdleCallback||setTimeout)(()=>prepareGuestFrame(),{timeout:500});
 return true;
}
// A frame that has walked off is kept loaded and reused: parsing the character
// document again for every fishman is what the stutter was made of.
const guestPool=[];
function retireGuestFrame(wrap){
 try{wrap.querySelector('iframe').contentWindow.advanceGuestMotion(0,'idle')}catch{}
 wrap.style.visibility='hidden';
 wrap.style.setProperty('--guest-x',GUEST_START+'%');
 if(guestPool.length<GUEST_LIMIT)guestPool.push(wrap);else wrap.remove();
}
function driveGuests(dt){
 drainGuestQueue(dt);
 for(let i=guests.length-1;i>=0;i--){
  const guest=guests[i];
  if(guest.phase==='wait'){
   guest.clock+=dt;if(guest.clock<guest.delay)continue;
   guest.phase='in';guest.clock=0;
  }else if(guest.phase==='in'){
   guest.x=Math.max(guest.target,guest.x-guest.speed*dt);
   if(guest.x<=guest.target){guest.phase='wave';guest.clock=0}
  }else if(guest.phase==='wave'){
   guest.clock+=dt;
   const span=(guest.frame.querySelector('iframe').contentWindow?.guestWaveDuration||1.5)+guest.hold;
   if(guest.clock>=span){guest.phase='out';guest.clock=0}
  }else{
   guest.x+=guest.speed*dt;
   if(guest.x>=GUEST_START){retireGuestFrame(guest.frame);guests.splice(i,1);continue}
  }
  guest.frame.style.setProperty('--guest-x',guest.x+'%');
  if(guest.frame.dataset.ready!=='1')continue;
  const mode=guest.phase==='wave'?'wave':guest.phase==='out'?'back':guest.phase==='in'?'walk':'idle';
  // Eight characters redrawing 60 times a second is more than the stage needs;
  // half that is indistinguishable here and leaves the game loop room.
  guest.poseClock=(guest.poseClock||0)+dt;
  if(guest.poseClock<.033&&mode===guest.poseMode)continue;
  const step=guest.poseClock;guest.poseClock=0;guest.poseMode=mode;
  try{guest.frame.querySelector('iframe').contentWindow.advanceGuestMotion(step,mode)}catch{}
 }
}
$('testLucky').onclick=()=>spawnSpecial('lucky');$('testGolden').onclick=()=>spawnSpecial('golden');$('summonFish').onclick=summonGuest;prepareGuestFrame();
function setText(el,value){if(el.textContent!==value)el.textContent=value}
function render(){
 renderEvents();
 $('balance').textContent=totalNumber(displayed);$('rate').textContent=precise(baseCps());$('rateMultiplier').hidden=state.events.frenzy<=0;$('clickValue').textContent='每次 +'+number(clickPower());document.querySelector('.phone').classList.toggle('running',cps()>0);
 document.querySelectorAll('[data-bulk]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.bulk===bulk)));
 // Keep purchase targets mounted across animation frames, including pointer-down/up.
 let consecutiveLocked=0;
 document.querySelectorAll('[data-building]').forEach(el=>{
  const i=+el.dataset.building,b=BUILDINGS[i],show=visible(i),price=buildingCost(i),disabled=!show||state.apples+1e-9<price;
  consecutiveLocked=show?0:consecutiveLocked+1;el.hidden=consecutiveLocked>2;
  if(el.disabled!==disabled)el.disabled=disabled;
  el.classList.toggle('affordable',!disabled);el.classList.toggle('locked',!show);
  setText(el.querySelector('.owned'),show?number(state.owned[i]):'');
  el.querySelector('.icon img').hidden=!show;el.querySelector('.unknown-icon').hidden=show;
  setText(el.querySelector('.label'),show?b.name:'???');
  el.querySelector('.cost').hidden=!show;
  setText(el.querySelector('.cost span'),show?number(price):'???');
  setText(el.querySelector('.gain'),show?`×${bulk} · +${precise(b.cps*multiplier(i)*bulk)}/秒`:'继续生产以发现');
  const label=show?`购买 ${bulk} 个${b.name}，${price} 苹果`:'未发现的建筑';
  if(el.getAttribute('aria-label')!==label)el.setAttribute('aria-label',label);
 });
 const affordable=offers().find(u=>u.price<=state.apples),offer=$('offer');offer.hidden=!affordable;
 if(affordable&&offer.dataset.upgrade!==affordable.id){
  offer.dataset.upgrade=affordable.id;offer.textContent=affordable.name;
  const price=document.createElement('b');price.textContent='🍎 '+number(affordable.price);offer.append(price);
  offer.setAttribute('aria-label',`可购买${affordable.name}，${affordable.price}苹果，打开小超市`);
 }
 if($('shopDialog').open){$('modalBalance').textContent=number(state.apples);for(const u of UPGRADES){const el=$('up-'+u.id),owned=state.upgrades.includes(u.id);el.hidden=!unlocked(u);const button=el.querySelector('button');button.textContent=owned?'已拥有':'🍎 '+number(u.price);button.disabled=owned||state.apples+1e-9<u.price}const has=UPGRADES.some(unlocked);$('emptyShop').hidden=has;$('emptyShop').textContent='购买第一个光标后，这里会出现升级商品。';PRIZES.forEach((_,i)=>$('prize-'+i).textContent='×'+state.prizes[i]);$('draw').disabled=state.apples<50}
}
function openShop(){returnFocus=document.activeElement;$('shopDialog').showModal();render();$('closeShop').focus()}
function closeShop(){$('shopDialog').close();returnFocus?.focus()}
$('produce').addEventListener('click',produce);$('offer').onclick=openShop;$('openShop').onclick=openShop;$('closeShop').onclick=closeShop;$('shopDialog').addEventListener('click',e=>{if(e.target===$('shopDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeShop()}});
$('shopDialog').addEventListener('cancel',()=>returnFocus?.focus());
$('buildings').addEventListener('click',e=>{const b=e.target.closest('[data-building]');if(b&&!b.disabled)buyBuilding(+b.dataset.building)});
$('upgrades').addEventListener('click',e=>{const b=e.target.closest('[data-upgrade]');if(b&&!b.disabled)buyUpgrade(b.dataset.upgrade)});
document.querySelectorAll('[data-bulk]').forEach(b=>b.onclick=()=>{bulk=+b.dataset.bulk;render()});document.querySelectorAll('.placeholder').forEach(b=>b.onclick=()=>notify('这个功能稍后开放'));
$('draw').onclick=draw;
$('restart').onclick=()=>{if(!confirm('确定重新开始？当前苹果、鱼人和升级进度将被清空。'))return;state=fresh();displayed=0;bulk=1;resetPurchaseSpeech();save();$('fx').replaceChildren();$('drawResult').textContent='下一颗，会是什么颜色？';render();notify('新工厂已开工')};
function update(dt){const buffTime=Math.min(dt,state.events.frenzy);earn(baseCps()*(dt+6*buffTime));updateEvents(dt);updateGoldRain(dt);driveGoldenDance(dt);driveTalk(dt);driveGuests(dt);displayed+=(state.apples-displayed)*(1-Math.exp(-dt*14));if(Math.abs(state.apples-displayed)<.05)displayed=state.apples;saveClock+=dt;if(saveClock>=2){saveClock=0;save()}render()}
// A first rAF timestamp can precede script initialization. Never advance backwards.
function frame(now){const dt=last===null?0:Math.max(0,Math.min((now-last)/1000,.25));last=now;if(!document.hidden)update(dt);requestAnimationFrame(frame)}
document.addEventListener('visibilitychange',()=>{last=null;save()});window.addEventListener('pagehide',save);
window.advanceTime=ms=>{for(let left=ms;left>0;left-=50)update(Math.min(left,50)/1000)};
window.render_game_to_text=()=>JSON.stringify({apples:state.apples,total:state.total,events:state.events,cps:cps(),clickPower:clickPower(),bulk,buildings:BUILDINGS.map((b,i)=>({name:b.name,owned:state.owned[i],price:buildingCost(i),visible:visible(i)})),upgrades:state.upgrades,affordableUpgrade:offers().find(u=>u.price<=state.apples)?.id||null,prizes:state.prizes,shopOpen:$('shopDialog').open});
render();requestAnimationFrame(frame);
// Commit the initial normal/buffed state before enabling color transitions.
requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove('game-booting')));

// Decorative assets must never initiate the browser's native image drag.
document.addEventListener('dragstart',event=>{if(event.target instanceof HTMLImageElement)event.preventDefault()});
document.querySelectorAll('img').forEach(img=>img.draggable=false);

document.addEventListener('selectstart',event=>event.preventDefault());
document.addEventListener('contextmenu',event=>event.preventDefault());
