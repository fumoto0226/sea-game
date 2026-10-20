'use strict';
// Data reference: Cookie Clicker live web main.js, retrieved 2026-10-18.
// Ten buildings, ordinary tiers, employee mentoring, finger and click upgrades.
const BUILDINGS=[
 {
  "name": "兼职鱼人",
  "original": "Cursor",
  "icon": "img/svg/fisher-parttime.svg",
  "price": 15,
  "cps": 0.1,
  "desc": "空闲时间也能摘苹果，迈出鱼生打工的第一步。"
 },
 {
  "name": "鱼人社员",
  "guestLook": "navy-suit",
  "original": "Grandma",
  "icon": "img/svg/fisher-staff.svg",
  "price": 100,
  "cps": 1,
  "desc": "正式入职，工牌一戴，稳定产出的日子开始了。"
 },
 {
  "name": "网红鱼人",
  "guestLook": "influencer",
  "original": "Farm",
  "icon": "img/svg/fisher-influencer.svg",
  "price": 1100,
  "cps": 8,
  "desc": "边直播边摘果，粉丝的关注也成了生产力。"
 },
 {
  "name": "变异鱼人",
  "guestLook": "milk-frog",
  "original": "Mine",
  "icon": "img/svg/fisher-mutant.svg",
  "price": 12000,
  "cps": 47,
  "desc": "多长出来的触手，各自负责一条苹果生产线。"
 },
 {
  "name": "海绵鱼人",
  "original": "Factory",
  "icon": "img/svg/fisher-sponge.svg",
  "price": 130000,
  "cps": 260,
  "desc": "吸收海里的养分，把苹果种得饱满又多汁。"
 },
 {
  "name": "小丑鱼人",
  "original": "Bank",
  "icon": "img/svg/fisher-clown.svg",
  "price": 1400000,
  "cps": 1400,
  "desc": "用杂耍接住每颗苹果，把果园变成欢乐舞台。"
 },
 {
  "name": "国王鱼人",
  "original": "Temple",
  "icon": "img/svg/fisher-king.svg",
  "price": 20000000,
  "cps": 7800,
  "desc": "王冠之下，整座果园都听从他的号令。"
 },
 {
  "name": "外星鱼人",
  "original": "Wizard tower",
  "icon": "img/svg/fisher-alien.svg",
  "price": 330000000,
  "cps": 44000,
  "desc": "从遥远星系赶来，用外星科技培育苹果。"
 },
 {
  "name": "英雄鱼人",
  "original": "Shipment",
  "icon": "img/svg/fisher-hero.svg",
  "price": 5100000000,
  "cps": 260000,
  "desc": "身披披风守护果园，每一次出手都满载而归。"
 },
 {
  "name": "鱼神",
  "original": "Alchemy lab",
  "icon": "img/svg/fisher-god.svg",
  "price": 75000000000,
  "cps": 1600000,
  "desc": "不必多言。"
 }
];
const UPGRADES=createItemUpgrades(BUILDINGS);
const KEY='apple-works-demo-v1',$=id=>document.getElementById(id);
const fresh=()=>({apples:0,total:0,handmade:0,goldenClicks:0,owned:BUILDINGS.map(()=>0),produced:BUILDINGS.map(()=>0),upgrades:[],prizes:[0,0,0],draws:0,events:freshEvents()});
let state=fresh(),bulk=1,displayed=0,last=null,saveClock=0,toastTimer,returnFocus;
try{const data=JSON.parse(localStorage.getItem(KEY));if(data?.version===1){const v=data.state;if(Number.isFinite(v.apples)&&v.apples>=0&&Array.isArray(v.owned)&&[5,BUILDINGS.length].includes(v.owned.length)&&v.owned.every(n=>Number.isInteger(n)&&n>=0)){state={...fresh(),...v,owned:BUILDINGS.map((_,i)=>v.owned[i]||0),produced:BUILDINGS.map((_,i)=>Number.isFinite(v.produced?.[i])&&v.produced[i]>=0?v.produced[i]:0),upgrades:(v.upgrades||[]).filter(id=>UPGRADES.some(u=>u.id===id))};
// Temporary bonuses expire in real time, before the first render. Legacy saves
// have no trustworthy deadline, so discard only their temporary frenzy.
state.events={...freshEvents(),...state.events,frenzy:Number.isFinite(data.frenzyExpiresAt)?Math.max(0,Math.min(state.upgrades.includes('gold-get-lucky')?120:60,(data.frenzyExpiresAt-Date.now())/1000)):0};}}}catch{}
state.events={...freshEvents(),...state.events};
state.goldenClicks=Number.isSafeInteger(state.goldenClicks)&&state.goldenClicks>=0?state.goldenClicks:0;
state.events.frenzyDuration=state.events.frenzyDuration===120?120:60;
displayed=state.apples;
// Keep the existing count-up curve, but sample fast growth at a readable
// cadence. Skipped intermediate integers never affect the actual balance.
let balancePaintClock=0,lastPaintedBalance=null;
function paintBalance(){
 const settled=Math.abs(state.apples-displayed)<.05;
 if(lastPaintedBalance===null||displayed<lastPaintedBalance||settled||balancePaintClock>=.075){
  const label=totalNumber(displayed);
  if($('balance').textContent!==label)$('balance').textContent=label;
  lastPaintedBalance=displayed;balancePaintClock%=.075;
 }
}
// Like the reference, abbreviate from one million; keep smaller balances whole.
function formatNumber(n,decimals=0){
 if(!Number.isFinite(n))return '∞';
 const magnitude=Math.abs(n),units=['M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg','UVg','DVg','TVg'];
 if(magnitude<1e6)return (decimals?Number(n.toFixed(decimals)):Math.floor(n)).toLocaleString('en-US');
 let tier=Math.min(Math.floor(Math.log10(magnitude)/3)-2,units.length-1),value=n/10**(6+tier*3);
 if(Math.abs(Number(value.toFixed(2)))>=1000&&tier<units.length-1){tier++;value/=1000}
 return Number(value.toFixed(2)).toLocaleString('en-US')+' '+units[tier];
}
// Top counter keeps up to nine integer digits before promoting its unit.
function totalNumber(n){
 if(!Number.isFinite(n))return '∞';
 const units=['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg','UVg','DVg','TVg'];let value=Math.max(0,n),unit=0;
 while(value>=1e9&&unit<units.length-1){value/=1000;unit++}
 return Math.floor(value).toLocaleString('en-US')+(unit?' '+units[unit]:'');
}
const number=n=>formatNumber(n),precise=n=>formatNumber(n,1);
// Rebuild purchased effects only when the inventory changes, not for every
// fish and every animation frame. Counts still feed live mentoring bonuses.
let effectSource=null,effectCount=-1,effectCache;
function upgradeEffects(){
 if(effectSource===state.upgrades&&effectCount===state.upgrades.length)return effectCache;
 effectSource=state.upgrades;effectCount=state.upgrades.length;
 const owned=new Set(state.upgrades),effects={doubles:BUILDINGS.map(()=>1),mentors:new Set(),fingers:0,mouse:0,global:1,frequency:1,duration:1};
 let fingerFactor=1;
 for(const u of UPGRADES){if(!owned.has(u.id))continue;
  if(u.kind==='double')effects.doubles[u.building]*=2;
  else if(u.kind==='mentor')effects.mentors.add(u.building);
  else if(u.kind==='fingers')fingerFactor*=u.factor;
  else if(u.kind==='mouse')effects.mouse++;
  else if(u.kind==='global')effects.global*=1+u.power/100;
  else if(u.kind==='gold-frequency')effects.frequency*=2;
  else if(u.kind==='gold-duration')effects.duration*=2;
 }
 effects.fingers=owned.has('fingers-0')?.1*fingerFactor:0;
 return effectCache=effects;
}
const multiplier=i=>{
 const e=upgradeEffects();let value=e.doubles[i];
 if(i===1)value*=2**e.mentors.size;
 if(i>=2&&e.mentors.has(i))value*=1+state.owned[1]*.01/(i-1);
 return value;
};
const fingerBonus=()=>upgradeEffects().fingers*state.owned.slice(1).reduce((a,b)=>a+b,0);
// One unit's output, upgrades and finger bonuses included.
const unitCps=i=>(BUILDINGS[i].cps*multiplier(i)+(i===0?fingerBonus():0))*upgradeEffects().global;
const baseCps=()=>BUILDINGS.reduce((sum,b,i)=>sum+unitCps(i)*state.owned[i],0);
const clickPower=()=>(multiplier(0)+fingerBonus()+baseCps()*.01*upgradeEffects().mouse)*(state.events.frenzy>0?7:1);
const cps=()=>baseCps()*(state.events.frenzy>0?7:1);
const currentUnitCps=i=>unitCps(i)*(state.events.frenzy>0?7:1);
const productionNumber=n=>formatNumber(n,3);
// Original bulk pricing sums unrounded prices, then rounds the complete batch up.
function buildingCost(i,n=bulk){let sum=0;for(let k=0;k<n;k++)sum+=BUILDINGS[i].price*1.15**(state.owned[i]+k);return Math.ceil(sum)}
// Official web rule: reveal at lifetime earnings >= base price; preview two locked rows.
const visible=i=>state.owned[i]>0||state.total>=BUILDINGS[i].price;
const unlocked=u=>{
 if(u.kind==='global')return state.total>=u.earned;
 if(u.kind==='gold-frequency'||u.kind==='gold-duration')return state.goldenClicks>=u.clicks;
 if(u.kind==='mouse')return (state.handmade||0)>=u.handmade;
 return state.owned[u.building]>=u.need&&(u.kind!=='mentor'||state.owned[1]>0);
};
const offers=()=>UPGRADES.filter(u=>unlocked(u)&&!state.upgrades.includes(u.id)).sort((a,b)=>a.price-b.price);
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,state,frenzyExpiresAt:state.events.frenzy>0?Date.now()+state.events.frenzy*1000:0}))}catch{}}
function notify(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2000)}
function earn(amount){state.apples+=amount;state.total+=amount}
function spend(amount){if(state.apples+1e-9<amount)return false;state.apples=Math.max(0,state.apples-amount);displayed=state.apples;return true}
// Consecutive successful purchases belong to one batch until 2s of silence.
let purchaseSpeechLast=-Infinity,purchaseSpeechTimer,purchaseSpeechFrame=0;
const PURCHASE_SPEECHES=['哦，又来新人了。','干活去吧','欢迎新员工','活是干不完的','鱼人也得上班','你上家公司福利咋样','如果不种苹果，鱼身还有意义吗？','谁是世界上第一个吃苹果的鱼？'];
let lastPurchaseSpeech='';
function drawSpeechOutline(progress){
 const left=30.5,right=78+331.5*progress,r=Math.min(20,(right-left)/2),bottom=84.5;
 $('speechPath').setAttribute('d',`M${left+r} .5H${right-r}Q${right} .5 ${right} ${r+.5}V${bottom-r}Q${right} ${bottom} ${right-r} ${bottom}H${left+r}Q${left} ${bottom} ${left} ${bottom-r}V39L.5 26L${left} 25V${r+.5}Q${left} .5 ${left+r} .5Z`);
}
function animatePurchaseSpeech(message){
 cancelAnimationFrame(purchaseSpeechFrame);purchaseSpeechFrame=0;
 const text=$('speechText');$('speechMeasure').textContent=message;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){drawSpeechOutline(1);text.textContent=message;return}
 text.textContent='';drawSpeechOutline(0);
 const start=performance.now();
 const step=now=>{
  const elapsed=Math.max(0,now-start),progress=Math.min(1,elapsed/360);
  drawSpeechOutline(1-(1-progress)**3);
  text.textContent=message.slice(0,Math.max(0,Math.floor((elapsed-100)/60)));
  if(elapsed<100+message.length*60)purchaseSpeechFrame=requestAnimationFrame(step);else purchaseSpeechFrame=0;
 };
 purchaseSpeechFrame=requestAnimationFrame(step);
}
function greetPurchase(){
 const now=performance.now(),newBatch=now-purchaseSpeechLast>=2000;purchaseSpeechLast=now;
 if(!newBatch)return;
 const choices=PURCHASE_SPEECHES.filter(line=>line!==lastPurchaseSpeech),message=choices[Math.floor(Math.random()*choices.length)];lastPurchaseSpeech=message;
 const speech=$('purchaseSpeech');speech.hidden=false;animatePurchaseSpeech(message);talkOnce();
 clearTimeout(purchaseSpeechTimer);purchaseSpeechTimer=setTimeout(()=>speech.hidden=true,Math.max(2700,2100+message.length*60));
}
function resetPurchaseSpeech(){talkPending=false;clearTimeout(purchaseSpeechTimer);cancelAnimationFrame(purchaseSpeechFrame);purchaseSpeechFrame=0;purchaseSpeechLast=-Infinity;lastPurchaseSpeech='';$('purchaseSpeech').hidden=true}
function buyBuilding(i){if(!visible(i)||!spend(buildingCost(i)))return false;state.owned[i]+=bulk;syncRecruitGains();greetPurchase();queueGuests(bulk,unitCps(i),i);save();render();notify(`${BUILDINGS[i].name} +${bulk} · 每秒 ${precise(cps())} 苹果`);return true}
function buyUpgrade(id){const u=UPGRADES.find(x=>x.id===id);if(!u||!unlocked(u)||state.upgrades.includes(id)||!spend(u.price))return false;animateItemPurchase(id);state.upgrades.push(id);syncRecruitGains();save();render();notify('已购买：'+u.name);return true}
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
function produce(event){animateProductionPress();playClickSound();const n=clickPower();state.handmade=(state.handmade||0)+n;earn(n);clickEffects(event,n);render()}

$('buildings').innerHTML=BUILDINGS.map((b,i)=>`<button class="building" data-building="${i}"><span class="tile"><span class="owned"></span><span class="icon"><img src="${b.icon}" alt="" draggable="false"><span class="unknown-icon">?</span></span><span class="label"></span><span class="recruit-hint">再次点击招募</span></span><span class="cost"><img src="img/svg/apple2.svg" alt="苹果" draggable="false"><span></span></span><span class="gain"></span></button>`).join('');
// Reference base Golden Cookie timing: 30 trials/sec, hazard ((t-300)/600)^5.
// This demo restricts outcomes to Lucky and Frenzy; Frenzy duration is customized to 60s.
function freshEvents(){return {elapsed:0,carry:0,active:null,lastKind:null,frenzy:0,frenzyDuration:60}}
function chooseEventKind(){const last=state.events.lastKind;if(last&&Math.random()<.8)return last==='lucky'?'golden':'lucky';return Math.random()<.5?'lucky':'golden'}
function spawnSpecial(kind=chooseEventKind()){
 const e=state.events;let x,y;
 for(let i=0;i<30;i++){x=.10+Math.random()*.79;y=.24+Math.random()*.32;if(!(x<.30&&y>.38)&&!(x>.73&&y>.49)&&!(x>.66&&y<.36))break}
 e.active={kind,x,y,remaining:13*upgradeEffects().frequency};e.elapsed=0;e.carry=0;save();render();return e.active;
}
function updateEvents(dt){
 const e=state.events;e.frenzy=Math.max(0,e.frenzy-dt);if(e.frenzy<1e-8)e.frenzy=0;
 if(e.active){e.active.remaining=Math.max(0,e.active.remaining-dt);if(e.active.remaining<1e-8){e.active=null;e.elapsed=0;e.carry=0}return}
 e.carry+=dt;
 while(e.carry+1e-9>=1/30){e.carry=Math.max(0,e.carry-1/30);e.elapsed+=1/30;
  const frequency=upgradeEffects().frequency,min=300/frequency,max=900/frequency;
  if(e.elapsed>=max||(e.elapsed>min&&Math.random()<((e.elapsed-min)/(max-min))**5)){spawnSpecial();break}
 }
}
function specialBurst(kind,amount,x,y){
 const rect=document.querySelector('.phone').getBoundingClientRect(),px=rect.left+x*rect.width,py=rect.top+y*rect.height;
 const label=document.createElement('div');label.className='special-reward';label.dataset.kind=kind;label.textContent=kind==='lucky'?'幸运！ +'+number(amount)+' 苹果':'黄金狂热！ 产量 ×7';label.style.left=px+'px';label.style.top=py+'px';$('fx').append(label);setTimeout(()=>label.remove(),1900);
 const ring=document.createElement('i');ring.className='special-ring';ring.style.left=px+'px';ring.style.top=py+'px';$('fx').append(ring);setTimeout(()=>ring.remove(),900);
 for(let i=0;i<26;i++){const part=document.createElement('img');part.className='special-spark';part.src=kind==='lucky'?'img/svg/apple-lucky.svg':'img/svg/apple-gold.svg?v=frenzy16';part.alt='';part.draggable=false;part.style.left=px+'px';part.style.top=py+'px';const angle=Math.PI*2*i/26;part.style.setProperty('--dx',Math.cos(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--dy',Math.sin(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--spin',Math.random()*360+'deg');$('fx').append(part);setTimeout(()=>part.remove(),1200)}
}
function collectSpecial(){
 const e=state.events,apple=e.active;if(!apple)return false;
 e.active=null;e.elapsed=0;e.carry=0;e.lastKind=apple.kind;state.goldenClicks++;let amount=0;
 if(apple.kind==='lucky'){amount=Math.min(state.apples*.15,cps()*900)+13;earn(amount)}else {e.frenzyDuration=60*upgradeEffects().duration;e.frenzy=e.frenzyDuration;}
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
document.querySelector('.fish-character').addEventListener('load',()=>{sentGoldenDance=null;try{document.querySelector('.fish-character').contentWindow.setCharacterLook({skin:'milk-frog',helmet:null});document.querySelector('.fish-character').contentDocument.addEventListener('pointerdown',()=>closeBuildingCard())}catch{}syncGoldenDance(state.events.frenzy>0)});
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
  button.dataset.kind=active.kind;button.style.left=active.x*100+'%';button.style.top=active.y*100+'%';button.style.opacity=String(Math.min(1,active.remaining/1.2));button.setAttribute('aria-label',(active.kind==='lucky'?'幸运苹果，领取即时奖励':`金苹果，开启${60*upgradeEffects().duration}秒七倍点击与自动产量`));
  const src=active.kind==='golden'?'img/svg/apple-gold.svg?v=frenzy16':'img/svg/apple-lucky.svg';if(button.querySelector('img').getAttribute('src')!==src)button.querySelector('img').src=src;
 }else layer.replaceChildren();
 const boosted=e.frenzy>0,remaining=Math.min(100,e.frenzy/e.frenzyDuration*100),balance=document.querySelector('.balance'),ring=$('frenzyRing');
 const countdown=$('frenzyCountdown');countdown.hidden=!boosted;
 if(boosted){const label=`剩余 ${e.frenzy.toFixed(2)}s`;if(countdown.textContent!==label)countdown.textContent=label}
 syncGoldenDance(boosted);
 document.querySelector('.phone').classList.toggle('golden-frenzy',boosted);$('frenzyBadge').hidden=!boosted;ring.toggleAttribute('hidden',!boosted);
 const phone=document.querySelector('.phone'),phoneBox=phone.getBoundingClientRect(),buttonBox=$('produce').getBoundingClientRect();phone.style.setProperty('--aura-x',(buttonBox.left+buttonBox.width/2-phoneBox.left)+'px');phone.style.setProperty('--aura-y',(buttonBox.top+buttonBox.height/2-phoneBox.top)+'px');
 if(!boosted){$('goldRain').replaceChildren();rainCarry=0;productionTap?.cancel();productionTap=null}
 balance.style.setProperty('--buff-progress',remaining+'%');
 if(boosted){
  $('frenzyBadge').setAttribute('aria-label','产能乘以七，黄金狂热');
  ring.setAttribute('aria-valuemax',e.frenzyDuration);ring.setAttribute('aria-valuenow',e.frenzy.toFixed(1));
  const bounds=balance.getBoundingClientRect(),border=parseFloat(getComputedStyle(balance).borderTopWidth),w=bounds.width-2*border,h=bounds.height-2*border,key=w+':'+h;
  if(ring.dataset.size!==key){
   ring.dataset.size=key;ring.setAttribute('viewBox',`0 0 ${w} ${h}`);
   const outer=getComputedStyle(balance),inner=getComputedStyle(balance,'::before'),gap=parseFloat(inner.left),innerBorder=parseFloat(inner.borderTopWidth),p=gap/2;
   const outerR=parseFloat(outer.borderTopLeftRadius)-parseFloat(outer.borderTopWidth),innerR=parseFloat(inner.borderTopLeftRadius),r=(outerR+innerR)/2;
   for(const [id,x,y,width,height,radius] of [['ringOuter',-1,-1,w+2,h+2,outerR+1],['ringInner',gap+innerBorder,gap+innerBorder,w-2*(gap+innerBorder),h-2*(gap+innerBorder),innerR-innerBorder]]){const el=$(id);for(const [key,value] of Object.entries({x,y,width,height,rx:radius}))el.setAttribute(key,value)}
   $('frenzyRingPath').style.strokeWidth=(gap*2+4)+'px';
   // Hide the seam on the left side beneath the apple badge, away from
   // its rounded lower-right corner. Travel upward, then clockwise.
   const startY=h*.6;
   $('frenzyRingPath').setAttribute('d',`M${p} ${startY} V${p+r} A${r} ${r} 0 0 1 ${p+r} ${p} H${w-p-r} A${r} ${r} 0 0 1 ${w-p} ${p+r} V${h-p-r} A${r} ${r} 0 0 1 ${w-p-r} ${h-p} H${p+r} A${r} ${r} 0 0 1 ${p} ${h-p-r} V${startY} Z`)
  }
  $('frenzyRingPath').style.strokeDasharray=remaining+' 100';
  // Advance the empty section clockwise; the last gold ends at the start.
  $('frenzyRingPath').style.strokeDashoffset=String(remaining-100);
 }

}

// DEMO: summon a guest fishman. It enters from off-stage right, walks left to a
// random spot in the open floor, waves, then keeps walking left off-screen
// without turning round. Up to GUEST_LIMIT at once; further clicks do nothing.
// Each one gets its own entry delay, pace and spot so a burst of clicks does not
// send out a single column of identical fishmen.
// Ordinary visitors share a cached sprite atlas.
const guests=[];
// GUEST_START puts the frame just far enough right that the fishman drawn
// inside it is off the phone's edge, so a click shows a step almost at once.
const GUEST_LIMIT=10,GUEST_START=92,GUEST_EXIT=-40,GUEST_LEAVE=-24,GUEST_MIN=34,GUEST_MAX=62,GUEST_GAP=7;
// Both rigs share the same ground baseline; positive depth is nearer the viewer.
const characterDepthLayer=depth=>3+Math.round((depth+2)*10);
document.querySelector('.fish-character').style.zIndex=String(characterDepthLayer(0));
function guestTarget(){
 // Reserve upcoming stops too, so a batch cannot all choose the same empty spot.
 // Departing visitors only occupy their current position, not their old stop.
 const occupied=guests.map(guest=>({
  x:guest.phase==='out'?guest.x:guest.target,depth:guest.depth
 })).filter(spot=>spot.x>=GUEST_MIN-GUEST_GAP&&spot.x<=GUEST_MAX+GUEST_GAP);
 let best=null,bestScore=-Infinity;
 // Sample the whole floor rather than falling back to a fully random position
 // when crowded. Depth separation lets nearby fish overlap without stacking.
 for(let column=0;column<15;column++)for(let row=0;row<5;row++){
  const x=GUEST_MIN+(column+Math.random())/15*(GUEST_MAX-GUEST_MIN);
  const depth=-2+(row+Math.random());
  let nearest=Infinity,crowding=0;
  for(const spot of occupied){
   const distance=((x-spot.x)/GUEST_GAP)**2+((depth-spot.depth)/2.5)**2;
   nearest=Math.min(nearest,distance);crowding+=Math.exp(-distance);
  }
  const score=occupied.length?nearest-.15*crowding:Math.random();
  if(score>bestScore){bestScore=score;best={x,depth}}
 }
 return best;
}
// All ordinary visitors share the same pre-rendered poses. The resident keeps
// its live deformation engine; visitors no longer need a full editor iframe each.
const guestAtlas=new Image();guestAtlas.src='img/guest-atlas.webp?v=floor73';
const staffAtlas=new Image();staffAtlas.src='img/guest-staff-atlas.webp?v=floor73';
const mutantAtlas=new Image();mutantAtlas.src='img/guest-mutant-atlas.webp?v=1';
const influencerAtlas=new Image();influencerAtlas.src='img/guest-influencer-atlas.webp?v=occlusion74';
let spareGuestFrame=null;
function makeGuestFrame(){
 const wrap=document.createElement('div');
 wrap.className='fish-guest';wrap.setAttribute('aria-hidden','true');
 const shadow=document.createElement('div');shadow.className='fish-guest-shadow';
 const canvas=document.createElement('canvas');canvas.className='guest-sprite';
 canvas.width=256;canvas.height=376;wrap.append(shadow,canvas);
 wrap.guestContext=canvas.getContext('2d');wrap.guestPose=-1;
 wrap.style.visibility='hidden';wrap.dataset.ready='1';
 document.querySelector('.phone').append(wrap);
 return wrap;
}
function prepareGuestFrame(){
 if(!spareGuestFrame)spareGuestFrame=makeGuestFrame();
}
function paintGuestPose(wrap,index){
 const atlas=wrap.guestAtlas||guestAtlas;
 if(!atlas.complete||!atlas.naturalWidth||wrap.guestPose===index)return;
 const ctx=wrap.guestContext;ctx.clearRect(0,0,256,376);
 ctx.drawImage(atlas,(index%8)*256,Math.floor(index/8)*376,256,376,0,0,256,376);
 wrap.guestPose=index;
}
function positionGuest(wrap,x){
 // Percent transform is relative to the 40%-wide visitor, avoiding layout per step.
 wrap.style.transform=`translate3d(${x*2.5}%,0,0)`;
}
// Every building purchase sends that many ordinary fishmen on stage. Only GUEST_LIMIT fit at once,
// so the rest wait here and walk on as earlier ones leave.
let guestQueue=[];
function queueGuests(count,gain=0,building=null){for(let i=0;i<count;i++)guestQueue.push({gain,building});if(gain>0)rateDeferred+=gain*count}
// Reprice recruits still waiting or walking when permanent production changes.
// Labels already in flight finish with the amount displayed when they departed.
function syncRecruitGains(){
 for(const recruit of [...guestQueue,...guests]){
  if(!Number.isInteger(recruit.building)||recruit.gain<=0)continue;
  const latest=unitCps(recruit.building);
  rateDeferred+=latest-recruit.gain;recruit.gain=latest;
 }
}
// Stagger arrivals for readability; excess recruits remain queued.
let guestReleaseWait=0;
function drainGuestQueue(dt){
 guestReleaseWait-=dt;
 if(!guestQueue.length||guestReleaseWait>0||guests.length>=GUEST_LIMIT)return;
 if(summonGuest(guestQueue[0].gain,guestQueue[0].building)){guestQueue.shift();guestReleaseWait=.7}
}
function summonGuest(gain=0,building=null){
 if(!Number.isFinite(gain))gain=0;
 const look=BUILDINGS[building]?.guestLook||'ordinary';
 const atlas=({'navy-suit':staffAtlas,influencer:influencerAtlas,'milk-frog':mutantAtlas})[look]||guestAtlas;
 if(!atlas.complete||!atlas.naturalWidth||guests.length>=GUEST_LIMIT)return false;
 const frame=guestPool.pop()||spareGuestFrame||makeGuestFrame();
 if(frame===spareGuestFrame)spareGuestFrame=null;
 frame.guestAtlas=atlas;frame.guestPose=-1;frame.dataset.look=look;
 frame.style.visibility='visible';
 const waiting=guests.filter(guest=>guest.phase==='wait'||guest.phase==='in').length;
 const stop=guestTarget(),depth=stop.depth;
 const entry={frame,depth,gain,building,x:GUEST_START,target:stop.x,phase:'wait',clock:0,
  // The first one off the mark leaves at once; the queue's own release gap
  // spaces the rest out, so each only needs a small random extra.
  delay:waiting?Math.random()*.3:0,
  speed:23+Math.random()*8,hold:.2+Math.random()*.7};
 positionGuest(frame,GUEST_START);paintGuestPose(frame,0);
 // A little depth offset so two fishmen standing near each other do not overlap
 // exactly. The lower one stands nearer the camera, so it is drawn in front.
 frame.style.setProperty('--guest-y',depth.toFixed(2)+'%');
 frame.style.zIndex=String(characterDepthLayer(depth));
 guests.push(entry);
 prepareGuestFrame();
 return true;
}
// A recruit that has walked off stage sends its production up to the rate
// ticket; the number only starts climbing once the label lands there.
let rateDeferred=0,rateRoll=0,rateRollSpeed=0,rateFlights=0;
function flyRateGain(gain,depth,guestX=-10){
 const phone=document.querySelector('.phone'),rateEl=document.querySelector('.rate');
 if(!phone||!rateEl){rateDeferred=Math.max(0,rateDeferred-gain);return}
 const box=phone.getBoundingClientRect(),target=rateEl.getBoundingClientRect();
 const tag=document.createElement('div');
 tag.className='rate-gain';tag.setAttribute('aria-hidden','true');
 tag.innerHTML='<img src="img/svg/apple.svg" alt=""><span>+'+productionNumber(gain*(state.events.frenzy>0?7:1))+'/s</span>';
 phone.append(tag);rateFlights++;
 // Start on the fishman's own body, which by now is just off the left edge,
 // so the label drifts in from off-screen rather than popping at the border.
 const startX=box.width*(guestX+20)/100,startY=box.height*(.39+(depth+12)/100);
 const endX=target.left-box.left+target.width*.5,endY=target.top-box.top+target.height*.5;
 tag.style.left=startX+'px';tag.style.top=startY+'px';
 // A quadratic curve with its control point under the ticket: the label drifts
 // inward almost flat at first, then bends upward and runs straighter the
 // higher it climbs.
 const ctrlX=endX,ctrlY=startY;
 const frames=[];
 for(let i=0;i<=16;i++){
  const t=i/16,inv=1-t;
  const x=inv*inv*startX+2*inv*t*ctrlX+t*t*endX;
  const y=inv*inv*startY+2*inv*t*ctrlY+t*t*endY;
  const scale=(t<.12?.85+t/.12*.15:1-(t-.12)/.88*.25).toFixed(3);
  frames.push({offset:t,transform:`translate(calc(-50% + ${(x-startX).toFixed(1)}px),calc(-50% + ${(y-startY).toFixed(1)}px)) scale(${scale})`});
 }
 const move=tag.animate(frames,{duration:1250,easing:'cubic-bezier(.33,0,.5,1)',fill:'forwards'});
 move.onfinish=()=>{
  tag.remove();rateFlights--;
  // Hand the amount to the ticket and let it roll up over a short beat.
  rateRoll+=gain;rateRollSpeed=rateRoll/.45;
  document.querySelector('.rate')?.classList.add('rate-bump');
  setTimeout(()=>document.querySelector('.rate')?.classList.remove('rate-bump'),260);
 };
}
function driveRateRoll(dt){
 if(rateRoll<=0)return;
 const step=Math.min(rateRoll,rateRollSpeed*dt);
 rateRoll-=step;rateDeferred=Math.max(0,rateDeferred-step);
 // Only settle the remainder once nothing is still queued, walking or in flight,
 // so a label still on its way keeps its own share held back.
 if(rateRoll<=1e-6){rateRoll=0;if(!rateFlights&&!guests.some(g=>g.gain>0)&&!guestQueue.some(g=>g.gain>0))rateDeferred=0}
}
// The ticket shows everything that has already arrived.
function shownRate(){return Math.max(0,baseCps()-rateDeferred)}
// Reuse the small canvas wrappers instead of allocating them for every purchase.
const guestPool=[];
function retireGuestFrame(wrap){
 wrap.style.visibility='hidden';
 positionGuest(wrap,GUEST_START);
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
   const span=1.5+guest.hold;
   if(guest.clock>=span){guest.phase='out';guest.clock=0}
  }else{
   guest.x-=guest.speed*dt;
   // The gain pops the moment the fishman clears the left edge, not when its
   // frame is finally retired further out.
   if(guest.gain>0&&guest.x<=GUEST_LEAVE){flyRateGain(guest.gain,guest.depth,guest.x);guest.gain=0}
   if(guest.x<=GUEST_EXIT){retireGuestFrame(guest.frame);guests.splice(i,1);continue}
  }
  positionGuest(guest.frame,guest.x);
  const mode=guest.phase==='wave'?'wave':guest.phase==='in'||guest.phase==='out'?'walk':'idle';
  if(mode!==guest.poseMode){guest.poseMode=mode;guest.poseTime=0}
  else guest.poseTime+=dt;
  const index=mode==='walk'?1+Math.floor((guest.poseTime%.9)*30):mode==='wave'?28+Math.min(45,Math.floor(guest.poseTime*30)):0;
  paintGuestPose(guest.frame,index);
 }
}
$('testLucky').onclick=()=>spawnSpecial('lucky');$('testGolden').onclick=()=>spawnSpecial('golden');$('summonFish').onclick=summonGuest;prepareGuestFrame();
// Keep the green unit and notches fixed while the white value bay grows.
function drawRateTicket(){
 const ticket=document.querySelector('.rate'),svg=ticket.querySelector('.rate-ticket');
 const {width:w,height:h}=ticket.getBoundingClientRect(),unit=ticket.querySelector('.rate-unit').getBoundingClientRect().width;
 if(!w||!h)return;
 const shadow=2,top=.5,bottom=h-shadow-.5,split=unit,r=h*.16;
 const outline=`M.5 ${top}H${split-r}Q${split} ${top+r*2} ${split+r} ${top}H${w-.5}V${bottom}H${split+r}Q${split} ${bottom-r*2} ${split-r} ${bottom}H.5Z`;
 svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
 svg.querySelector('clipPath path').setAttribute('d',outline);
 const edges=svg.querySelectorAll(':scope > path');
 edges[0].setAttribute('d',outline);edges[0].setAttribute('transform',`translate(0 ${shadow})`);
 edges[1].setAttribute('d',outline);
 const fills=svg.querySelectorAll('g > path');
 fills[0].setAttribute('d',`M0 0H${w}V${h}H0Z`);
 fills[1].setAttribute('d',`M0 0H${split}V${h}H0Z`);
}
new ResizeObserver(drawRateTicket).observe(document.querySelector('.rate'));
function setText(el,value){if(el.textContent!==value)el.textContent=value}
function render(){
 if(typeof renderCatalog==="function")renderCatalog();
 renderEvents();
 paintBalance();$('rate').textContent='+'+precise(shownRate()*(state.events.frenzy>0?7:1))+'/s';$('rateMultiplier').hidden=true;$('clickValue').textContent='每次 +'+number(clickPower());document.querySelector('.phone').classList.toggle('running',cps()>0);
 document.querySelectorAll('[data-bulk]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.bulk===bulk)));
 // Keep purchase targets mounted across animation frames, including pointer-down/up.
 if(armedRecruit!==null&&state.apples+1e-9<buildingCost(armedRecruit))armedRecruit=null;
 let consecutiveLocked=0;
 document.querySelectorAll('[data-building]').forEach(el=>{
  const i=+el.dataset.building,b=BUILDINGS[i],show=visible(i),price=buildingCost(i),disabled=!show,poor=state.apples+1e-9<price;
  consecutiveLocked=show?0:consecutiveLocked+1;el.hidden=consecutiveLocked>2;
  if(el.disabled!==disabled)el.disabled=disabled;
  el.classList.toggle('affordable',show&&!poor);el.classList.toggle('locked',!show);
  // An empty corner reads as "none yet"; a zero would look like a real count.
  setText(el.querySelector('.owned'),show&&state.owned[i]>0?number(state.owned[i]):'');
  // Undiscovered buildings show the same figure as a grey silhouette instead of a question mark.
  el.querySelector('.icon img').hidden=false;el.querySelector('.unknown-icon').hidden=true;
  setText(el.querySelector('.label'),show?b.name:'???');
  el.querySelector('.cost').hidden=!show;
  setText(el.querySelector('.cost span'),show?number(price):'???');
  setText(el.querySelector('.gain'),show?`×${bulk} · +${productionNumber(currentUnitCps(i)*bulk)}/秒`:'继续生产以发现');
  el.classList.toggle('picked',armedRecruit===i&&show&&!poor);
  const label=show?(poor?`查看${b.name}，苹果不够`:armedRecruit===i?`招募 ${bulk} 个${b.name}，${price} 苹果`:`查看${b.name}`):'未发现的建筑';
  if(el.getAttribute('aria-label')!==label)el.setAttribute('aria-label',label);
 });
 const hasItems=offers().length>0;$('vendingDot').hidden=!hasItems;$('openShop').setAttribute('aria-label',hasItems?'打开自动贩卖机，有新道具':'打开自动贩卖机');
 if(infoBuilding!==null)renderBuildingCard();
 if($('shopDialog').open)renderVending();
}
// Tapping a fishman tile opens its card first; buying needs a second tap (or the
// card's own recruit button), so a stray tap never spends apples.
let infoBuilding=null,armedRecruit=null;
function trackProduction(span){
 if(!Array.isArray(state.produced)||state.produced.length!==BUILDINGS.length)state.produced=BUILDINGS.map((_,i)=>state.produced?.[i]||0);
 for(let i=0;i<BUILDINGS.length;i++)state.produced[i]+=unitCps(i)*state.owned[i]*span;
}
function openBuildingCard(i){infoBuilding=i;armedRecruit=state.apples+1e-9>=buildingCost(i)?i:null;renderBuildingCard();render()}
function closeBuildingCard(keepRecruit=false){infoBuilding=null;if(!keepRecruit)armedRecruit=null;$('buildingCard').hidden=true;render()}
function renderBuildingCard(){
 const card=$('buildingCard'),i=infoBuilding;
 if(i===null||!visible(i)){card.hidden=true;return}
 const b=BUILDINGS[i],price=buildingCost(i),owned=state.owned[i],per=currentUnitCps(i);
 card.hidden=false;
 $('cardName').textContent=b.name;
 $('cardBulk').textContent='x'+bulk;
 $('cardPrice').textContent=number(price);
 $('cardDesc').textContent=b.desc;
 $('cardPer').textContent=`每个${b.name}每秒生产：${productionNumber(per)}个苹果`;
 $('cardOwned').textContent=`${number(owned)}个${b.name}每秒生产：${productionNumber(per*owned)}个苹果`;
 $('cardTotal').textContent=`到目前为止总共生产：${number(state.produced?.[i]||0)}个苹果`;
 const afford=state.apples+1e-9>=price;
 $('cardBuy').disabled=!afford;
 $('cardBuy').textContent=afford?'招募':'苹果不够';
 placeBuildingCard(i);
}
// The card floats over the phone, anchored above its tile and kept on screen.
function placeBuildingCard(i){
 const card=$('buildingCard'),tile=document.querySelector(`[data-building="${i}"]`),phone=document.querySelector('.phone');
 if(!tile||!phone)return;
 const box=phone.getBoundingClientRect(),rect=tile.getBoundingClientRect();
 const width=card.offsetWidth,margin=box.width*.03;
 let left=rect.left-box.left+rect.width/2-width/2;
 left=Math.max(margin,Math.min(box.width-width-margin,left));
 card.style.left=left+'px';
 card.style.bottom=(box.bottom-rect.top+box.height*.015)+'px';
}
// Hand-drawn art for the cheapest items; everything else still uses the
// placeholder until it is drawn.
const ITEM_ICONS={
 'finger':'img/svg/item-finger.svg',
 'cream':'img/svg/item-cream.svg',
 'tier-1-0':'img/svg/item-badge.svg',
 'tier-1-1':'img/svg/item-grip-glove.svg',
 'hands':'img/svg/item-two-fins.svg',
 'tier-2-0':'img/svg/item-ring-light.svg',
 'tier-1-2':'img/svg/item-lunch.svg',
 'mouse-0':'img/svg/item-clicker.svg',
 'tier-2-1':'img/svg/item-selfie-rig.svg',
 'mentor-2':'img/svg/item-mentor-influencer.svg',
 'fingers-0':'img/svg/item-all-hands.svg',
 'tier-3-0':'img/svg/item-juggling.svg',
 'tier-2-2':'img/svg/item-lens.svg',
 'tier-3-1':'img/svg/item-clown-nose.svg',
 'mentor-3':'img/svg/item-mentor-clown.svg',
 'supply-plain-cookies':'img/svg/item-bento.svg',
 'tier-4-0':'img/svg/item-crown.svg',
 'supply-sugar-cookies':'img/svg/item-apple-chips.svg',
 'tier-1-3':'img/svg/item-double-pay.svg',
 'mouse-1':'img/svg/item-clicker-steel.svg',
 'tier-3-2':'img/svg/item-stripe-suit.svg',
 'tier-4-1':'img/svg/item-cape.svg',
 'mentor-4':'img/svg/item-mentor-king.svg',
 'supply-oatmeal-raisin-cookies':'img/svg/item-juice.svg',
 'fingers-1':'img/svg/item-all-hands-2.svg',
 'tier-5-0':'img/svg/item-sponge.svg',
 'supply-peanut-butter-cookies':'img/svg/item-grilled-skewer.svg',
 'tier-2-3':'img/svg/item-trending.svg',
 'tier-4-2':'img/svg/item-royal-basket.svg',
 'tier-5-1':'img/svg/item-nutrient-bucket.svg',
 'mentor-5':'img/svg/item-mentor-sponge.svg',
 'supply-almond-cookies':'img/svg/item-onigiri.svg',
 'supply-cashew-cookies':'img/svg/item-breakfast.svg',
 'supply-coconut-cookies':'img/svg/item-buns.svg',
 'supply-hazelnut-cookies':'img/svg/item-orchard-box.svg',
 'supply-macadamia-nut-cookies':'img/svg/item-hot-soup.svg',
 'supply-walnut-cookies':'img/svg/item-fruit-cup.svg',
 'fingers-2':'img/svg/item-all-hands-3.svg',
 'tier-6-0':'img/svg/item-reagent.svg',
 'supply-milk-chocolate-cookies':'img/svg/item-apple-pie.svg',
 'supply-white-chocolate-cookies':'img/svg/item-share-pack.svg',
 'tier-1-4':'img/svg/item-certificate.svg',
 'mouse-2':'img/svg/item-clicker-titanium.svg',
 'tier-3-3':'img/svg/item-unicycle.svg',
 'tier-5-2':'img/svg/item-airy-sponge.svg',
 'gold-lucky-day':'img/svg/item-seaweed-charm.svg',
 'tier-6-1':'img/svg/item-fast-cell.svg',
 'mentor-6':'img/svg/item-mentor-mutant.svg',
 'fingers-3':'img/svg/item-all-hands-4.svg',
 'tier-7-0':'img/svg/item-antenna.svg',
 'supply-double-chip-cookies':'img/svg/item-kelp-meal.svg',
 'tier-2-4':'img/svg/item-fan-light.svg',
 'tier-4-3':'img/svg/item-decree.svg',
 'supply-white-chocolate-macadamia-nut-cookies':'img/svg/item-attendance-snack.svg',
 'tier-6-2':'img/svg/item-tentacles.svg',
 'fingers-4':'img/svg/item-all-hands-5.svg',
 'tier-7-1':'img/svg/item-antigrav-glove.svg',
 'mentor-7':'img/svg/item-mentor-alien.svg',
 'supply-all-chocolate-cookies':'img/svg/item-coffee.svg',
 'tier-1-5':'img/svg/item-training.svg',
 'mouse-3':'img/svg/item-clicker-mythril.svg',
 'tier-8-0':'img/svg/item-hero-badge.svg',
 'tier-3-4':'img/svg/item-flower-hat.svg',
 'tier-5-3':'img/svg/item-press.svg',
 'gold-serendipity':'img/svg/item-fortune-slip.svg',
 'supply-dark-chocolate-coated-cookies':'img/svg/item-apple-tea.svg',
 'supply-white-chocolate-coated-cookies':'img/svg/item-fruit-platter.svg',
 'tier-7-2':'img/svg/item-ufo-licence.svg',
 'tier-8-1':'img/svg/item-red-cape.svg',
 'mentor-8':'img/svg/item-mentor-hero.svg',
 'supply-eclipse-cookies':'img/svg/item-canteen-pie.svg',
 'tier-2-5':'img/svg/item-stream-team.svg',
 'tier-4-4':'img/svg/item-royal-guard.svg',
 'tier-9-0':'img/svg/item-prayer-bell.svg',
 'supply-zebra-cookies':'img/svg/item-afternoon-tea.svg',
 'tier-6-3':'img/svg/item-spores.svg',
 'tier-8-2':'img/svg/item-wristguard.svg',
 'tier-9-1':'img/svg/item-altar.svg',
 'mentor-9':'img/svg/item-mentor-god.svg',
 'supply-snickerdoodles':'img/svg/item-jam-bun.svg',
 'mouse-4':'img/svg/item-clicker-mystic.svg',
 'tier-3-5':'img/svg/item-flying-fish.svg',
 'tier-5-4':'img/svg/item-coral-filter.svg',
 'supply-stroopwafels':'img/svg/item-cheese-roll.svg',
 'fingers-5':'img/svg/item-all-hands-6.svg',
 'tier-7-3':'img/svg/item-plasma-scythe.svg',
 'tier-9-2':'img/svg/item-holy-branch.svg',
 'supply-macaroons':'img/svg/item-snack-box.svg',
 'tier-1-6':'img/svg/item-flex-shift.svg',
 'tier-4-5':'img/svg/item-palace-orchard.svg',
 'gold-get-lucky':'img/svg/item-golden-hourglass.svg',
 'supply-empire-biscuits':'img/svg/item-celebration-tower.svg',
 'tier-6-4':'img/svg/item-regeneration.svg',
 'tier-8-3':'img/svg/item-justice-basket.svg',
 'supply-madeleines':'img/svg/item-staff-meal.svg',
 'supply-palmiers':'img/svg/item-friday-dessert.svg',
 'mouse-5':'img/svg/item-clicker-phantom.svg',
 'tier-2-6':'img/svg/item-traffic-boost.svg',
 'tier-5-5':'img/svg/item-deep-nutrient.svg',
 'supply-palets':'img/svg/item-night-porridge.svg',
 'supply-sabl-eacute-s':'img/svg/item-banquet-ticket.svg',
 'tier-7-4':'img/svg/item-wormhole-basket.svg',
 'tier-9-3':'img/svg/item-oracle-book.svg',
 'tier-3-6':'img/svg/item-touring-troupe.svg',
 'supply-gingerbread-men':'img/svg/item-harvest-feast.svg',
 'supply-gingerbread-trees':'img/svg/item-apple-shake.svg',
 'tier-6-5':'img/svg/item-gene-upgrade.svg',
 'fingers-6':'img/svg/item-all-hands-7.svg',
 'tier-8-4':'img/svg/item-super-strength.svg',
 'supply-pure-black-chocolate-cookies':'img/svg/item-photo-cup.svg',
 'supply-pure-white-chocolate-cookies':'img/svg/item-fan-candy.svg',
 'tier-1-7':'img/svg/item-year-bonus.svg',
 'mouse-6':'img/svg/item-clicker-wish.svg',
 'tier-4-6':'img/svg/item-tribute.svg',
 'supply-ladyfingers':'img/svg/item-jam-biscuit.svg',
 'tier-7-5':'img/svg/item-quantum-nursery.svg',
 'tier-9-4':'img/svg/item-grail.svg',
 'supply-tuiles':'img/svg/item-fan-meal.svg',
 'tier-2-7':'img/svg/item-hot-search.svg',
 'tier-5-6':'img/svg/item-giant-straw.svg',
 'supply-chocolate-stuffed-biscuits':'img/svg/item-filter-soda.svg',
 'tier-8-5':'img/svg/item-lightning-dash.svg',
 'supply-checker-cookies':'img/svg/item-apple-jelly.svg',
 'mouse-7':'img/svg/item-clicker-fantasy.svg',
 'tier-3-7':'img/svg/item-applause.svg',
 'supply-butter-cookies':'img/svg/item-donut-trend.svg',
 'tier-6-6':'img/svg/item-split-culture.svg',
 'fingers-7':'img/svg/item-all-hands-8.svg',
 'tier-9-5':'img/svg/item-tide-scepter.svg',
 'supply-cream-cookies':'img/svg/item-signed-juice.svg',
 'tier-1-8':'img/svg/item-efficiency-manual.svg',
 'tier-4-7':'img/svg/item-sea-rule.svg',
 'supply-gingersnaps':'img/svg/item-million-cake.svg',
 'tier-7-6':'img/svg/item-star-transport.svg',
 'supply-cinnamon-cookies':'img/svg/item-deepsea-meal.svg',
 'mouse-8':'img/svg/item-clicker-unbreakable.svg',
 'tier-2-8':'img/svg/item-cross-sea-stream.svg',
 'tier-5-7':'img/svg/item-tide-pump.svg',
 'supply-vanity-cookies':'img/svg/item-collab-pie.svg',
 'tier-8-6':'img/svg/item-shield.svg',
 'supply-cigars':'img/svg/item-cross-sea-banquet.svg',
 'tier-3-8':'img/svg/item-sea-show.svg',
 'supply-pinwheel-cookies':'img/svg/item-trend-tower.svg',
 'tier-6-7':'img/svg/item-hive-mind.svg',
 'fingers-8':'img/svg/item-all-hands-9.svg',
 'tier-9-6':'img/svg/item-dew.svg',
 'supply-fudge-squares':'img/svg/item-rainbow-candy.svg',
 'tier-1-9':'img/svg/item-expert-cert.svg',
 'mouse-9':'img/svg/item-clicker-mithril.svg',
 'tier-4-8':'img/svg/item-golden-throne.svg',
 'supply-shortbread-biscuits':'img/svg/item-juggle-apples.svg',
 'tier-7-7':'img/svg/item-warp-planting.svg',
 'supply-millionaires-shortbreads':'img/svg/item-smile-muffin.svg',
 'tier-2-9':'img/svg/item-avatar-clone.svg',
 'tier-5-8':'img/svg/item-current-loop.svg',
 'supply-caramel-cookies':'img/svg/item-popcorn.svg',
 'tier-8-7':'img/svg/item-hero-league.svg',
 'supply-pecan-sandies':'img/svg/item-cream-cup.svg',
 'mouse-10':'img/svg/item-clicker-obsidian.svg',
 'tier-3-9':'img/svg/item-masks.svg',
 'supply-moravian-spice-cookies':'img/svg/item-spiral-roll.svg',
 'tier-6-8':'img/svg/item-adaptation.svg',
 'fingers-9':'img/svg/item-all-hands-10.svg',
 'tier-9-7':'img/svg/item-divine-orchard.svg',
 'supply-anzac-biscuits':'img/svg/item-unicycle-lunch.svg',
 'tier-4-9':'img/svg/item-sea-palace.svg',
 'supply-buttercakes':'img/svg/item-cheer-soda.svg',
 'tier-7-8':'img/svg/item-gravity-control.svg',
 'supply-ice-cream-sandwiches':'img/svg/item-tour-bucket.svg',
 'mouse-11':'img/svg/item-clicker-plasma.svg',
 'tier-1-10':'img/svg/item-remote-clone.svg',
 'tier-5-9':'img/svg/item-irrigation.svg',
 'supply-pink-biscuits':'img/svg/item-flying-fish-cookie.svg',
 'tier-8-8':'img/svg/item-space-rescue.svg',
 'supply-whole-grain-cookies':'img/svg/item-stage-candy.svg',
 'tier-2-10':'img/svg/item-space-stream.svg',
 'supply-candy-cookies':'img/svg/item-circus-feast.svg',
 'tier-6-9':'img/svg/item-super-cell.svg',
 'fingers-10':'img/svg/item-all-hands-11.svg',
 'tier-9-8':'img/svg/item-blessing.svg',
 'supply-big-chip-cookies':'img/svg/item-ovation-pie.svg',
 'mouse-12':'img/svg/item-clicker-miracle.svg',
 'tier-3-10':'img/svg/item-gravity-juggle.svg',
 'supply-one-chip-cookies':'img/svg/item-ocean-tower.svg',
 'tier-7-9':'img/svg/item-mothership.svg',
 'supply-sprinkles-cookies':'img/svg/item-royal-juice.svg',
 'tier-4-10':'img/svg/item-star-kingdom.svg',
 'supply-peanut-butter-blossoms':'img/svg/item-royal-pastry.svg',
 'tier-8-9':'img/svg/item-legend-awaken.svg',
 'mouse-13':'img/svg/item-clicker-aether.svg',
 'supply-no-bake-cookies':'img/svg/item-crown-cookie.svg',
 'tier-1-11':'img/svg/item-global-teamwork.svg',
 'tier-5-10':'img/svg/item-cloud-reservoir.svg',
 'supply-florentines':'img/svg/item-court-tea.svg',
 'fingers-11':'img/svg/item-all-hands-12.svg',
 'tier-9-9':'img/svg/item-star-temple.svg',
 'supply-chocolate-crinkles':'img/svg/item-gold-cup-drink.svg',
 'tier-2-11':'img/svg/item-holo-stage.svg',
 'supply-maple-cookies':'img/svg/item-imperial-bowl.svg',
 'tier-6-10':'img/svg/item-cross-mutation.svg',
 'mouse-14':'img/svg/item-clicker-omni.svg',
 'supply-persian-rice-cookies':'img/svg/item-ceremony-cookie.svg',
 'tier-3-11':'img/svg/item-time-circus.svg',
 'supply-norwegian-cookies':'img/svg/item-royal-lunch.svg',
 'tier-7-10':'img/svg/item-galaxy-net.svg',
 'supply-crispy-rice-cookies':'img/svg/item-tribute-box.svg',
 'tier-4-11':'img/svg/item-time-domain.svg',
 'supply-ube-cookies':'img/svg/item-coronation-pie.svg',
 'tier-8-10':'img/svg/item-time-guard.svg',
 'supply-butterscotch-cookies':'img/svg/item-ocean-banquet.svg',
 'tier-1-12':'img/svg/item-time-attendance.svg',
 'tier-5-11':'img/svg/item-nebula-filter.svg',
 'supply-speculaas':'img/svg/item-honey-apple.svg',
 'tier-9-10':'img/svg/item-karma-fruit.svg',
 'supply-chocolate-oatmeal-cookies':'img/svg/item-people-meal.svg',
 'tier-2-12':'img/svg/item-time-replay.svg',
 'tier-6-11':'img/svg/item-dimension-tendrils.svg',
 'supply-molasses-cookies':'img/svg/item-sea-festival.svg',
 'supply-biscotti':'img/svg/item-sponge-milk.svg',
 'tier-3-12':'img/svg/item-dream-stage.svg',
 'supply-waffle-cookies':'img/svg/item-airy-cake.svg',
 'tier-7-11':'img/svg/item-dimension-fold.svg',
 'supply-custard-creams':'img/svg/item-coral-jelly.svg',
 'tier-4-12':'img/svg/item-crown-all.svg',
 'supply-bourbon-biscuits':'img/svg/item-sea-souffle.svg',
 'tier-8-11':'img/svg/item-dimension-travel.svg',
 'supply-mini-cookies':'img/svg/item-tide-soda.svg',
 'tier-1-13':'img/svg/item-infinite-desk.svg',
 'tier-5-12':'img/svg/item-time-reservoir.svg',
 'supply-whoopie-pies':'img/svg/item-mineral-soup.svg',
 'supply-caramel-wafer-biscuits':'img/svg/item-cloud-candy.svg',
 'tier-9-11':'img/svg/item-genesis-seed.svg',
 'tier-2-13':'img/svg/item-parallel-channel.svg',
 'supply-chocolate-chip-mocha-cookies':'img/svg/item-sponge-roll.svg',
 'tier-6-12':'img/svg/item-life-rebuild.svg',
 'supply-chai-tea-cookies':'img/svg/item-deep-nutrient-dew.svg',
 'supply-earl-grey-cookies':'img/svg/item-current-supply.svg',
 'tier-3-13':'img/svg/item-endless-curtain.svg',
 'supply-corn-syrup-cookies':'img/svg/item-rain-juice.svg',
 'tier-7-12':'img/svg/item-time-farm.svg',
 'supply-icebox-cookies':'img/svg/item-nebula-meal.svg',
 'tier-4-13':'img/svg/item-eternal-reign.svg',
 'supply-graham-crackers':'img/svg/item-tide-pie.svg',
 'tier-8-12':'img/svg/item-many-hands-aid.svg',
 'supply-hardtack':'img/svg/item-sea-of-life.svg',
 'tier-1-14':'img/svg/item-lifetime-honor.svg',
 'tier-5-13':'img/svg/item-infinite-absorb.svg',
 'supply-cornflake-cookies':'img/svg/item-mutant-vitamin.svg',
 'supply-gluten-free-cookies':'img/svg/item-dual-candy.svg',
 'supply-tofu-cookies':'img/svg/item-glow-jelly.svg',
 'tier-9-12':'img/svg/item-heavens-harvest.svg',
 'tier-2-14':'img/svg/item-cosmic-top.svg',
 'supply-russian-bread-cookies':'img/svg/item-tentacle-meal.svg',
 'tier-6-13':'img/svg/item-infinite-evolution.svg',
 'supply-lebkuchen':'img/svg/item-regen-puree.svg',
 'tier-3-14':'img/svg/item-cosmic-comedy.svg',
 'supply-aachener-printen':'img/svg/item-cell-vitality.svg',
 'tier-7-13':'img/svg/item-infinite-colony.svg',
 'supply-canistrelli':'img/svg/item-gene-soup.svg',
 'tier-4-14':'img/svg/item-lord-of-seas.svg',
 'supply-nice-biscuits':'img/svg/item-spiral-biscuit.svg',
 'tier-8-13':'img/svg/item-eternal-mission.svg',
 'supply-french-pure-butter-cookies':'img/svg/item-adapt-pack.svg',
 'supply-petit-beurre':'img/svg/item-super-jelly-cup.svg',
 'tier-5-14':'img/svg/item-living-sea.svg',
 'supply-nanaimo-bars':'img/svg/item-split-pie.svg',
 'supply-berger-cookies':'img/svg/item-evolution-crate.svg',
 'tier-9-13':'img/svg/item-eternal-kingdom.svg',
 'supply-chinsuko':'img/svg/item-rebuild-meal.svg',
 'supply-panda-koala-biscuits':'img/svg/item-ultimate-banquet.svg',
 'tier-6-14':'img/svg/item-ultimate-fish.svg',
 'supply-putri-salju':'img/svg/item-freeze-dried.svg',
 'supply-milk-cookies':'img/svg/item-ufo-bento.svg',
 'tier-7-14':'img/svg/item-cosmic-farm.svg',
 'supply-kruidnoten':'img/svg/item-zerog-juice.svg',
 'supply-marie-biscuits':'img/svg/item-plasma-jelly.svg',
 'tier-8-14':'img/svg/item-harvest-legend.svg',
 'supply-meringue-cookies':'img/svg/item-quantum-jam.svg',
 'supply-yogurt-cookies':'img/svg/item-space-travel-meal.svg',
 'supply-thumbprint-cookies':'img/svg/item-wormhole-ring.svg',
 'tier-9-14':'img/svg/item-all-fruit-one.svg',
 'supply-pizzelle':'img/svg/item-moon-bar.svg',
 'supply-granola-cookies':'img/svg/item-warp-fluid.svg',
 'supply-ricotta-cookies':'img/svg/item-galaxy-platter.svg',
 'supply-roze-koeken':'img/svg/item-mothership-meal.svg',
 'supply-peanut-butter-cup-cookies':'img/svg/item-gravity-pie.svg',
 'supply-sesame-cookies':'img/svg/item-parallel-meal.svg',
 'supply-taiyaki':'img/svg/item-star-banquet.svg',
 'supply-vanillekipferl':'img/svg/item-hero-bar.svg',
 'supply-battenberg-biscuits':'img/svg/item-cape-roll.svg',
 'supply-rosette-cookies':'img/svg/item-justice-meal.svg',
 'supply-gangmakers':'img/svg/item-lightning-juice.svg',
 'supply-welsh-cookies':'img/svg/item-apple-shield.svg',
 'supply-raspberry-cheesecake-cookies':'img/svg/item-rescue-pack.svg',
 'supply-bokkenpootjes':'img/svg/item-super-biscuit.svg',
 'supply-fat-rascals':'img/svg/item-league-feast.svg',
 'supply-ischler-cookies':'img/svg/item-legend-soup.svg',
 'supply-matcha-cookies':'img/svg/item-guardian-meal.svg',
 'supply-dalgona-cookies':'img/svg/item-time-potion.svg',
 'supply-spicy-cookies':'img/svg/item-aid-grain.svg',
 'supply-smile-cookies':'img/svg/item-eternal-hero-feast.svg',
 'supply-kolachy-cookies':'img/svg/item-glory-cup.svg',
 'supply-gomma-cookies':'img/svg/item-god-dew.svg',
 'supply-vegan-cookies':'img/svg/item-holy-candy.svg',
 'supply-coyotas':'img/svg/item-oracle-meal.svg',
 'supply-frosted-sugar-cookies':'img/svg/item-dew-drink.svg',
 'supply-marshmallow-sandwich-cookies':'img/svg/item-grail-soup.svg',
 'supply-web-cookies':'img/svg/item-divine-honey.svg',
 'supply-havreflarn':'img/svg/item-star-offering.svg',
 'supply-alfajores':'img/svg/item-blessing-meal.svg',
 'supply-gaufrettes':'img/svg/item-karma-jam.svg',
 'supply-cookie-bars':'img/svg/item-genesis-pie.svg',
 'supply-snowball-cookies':'img/svg/item-heaven-feast.svg',
 'supply-sequilhos':'img/svg/item-eternal-dew.svg',
 'supply-hazelnut-swirlies':'img/svg/item-all-one-meal.svg',
 'supply-spritz-cookies':'img/svg/item-infinite-grace.svg',
 'supply-mbatata-cookies':'img/svg/item-origin-fruit.svg',
 'supply-springerles':'img/svg/item-universe-end-feast.svg',
};
const itemIcon=id=>ITEM_ICONS[id]||'img/svg/item-placeholder.svg';
let selectedItem=null,vendingSignature='';
// What has to happen before an item shows up in the vending machine. The
// fields are the ones `unlocked()` tests, so the two cannot drift apart.
function itemUnlock(u){
 if(u.kind==='global')return `累计生产 ${number(Math.ceil(u.earned))} 苹果`;
 if(u.kind==='gold-frequency'||u.kind==='gold-duration')return `领取 ${number(u.clicks)} 次金苹果`;
 if(u.kind==='mouse')return `手动点击累计生产 ${number(Math.ceil(u.handmade))} 苹果`;
 const base=`拥有 ${number(u.need)} 名${BUILDINGS[u.building].name}`;
 return u.kind==='mentor'?`${base}，且至少 1 名${BUILDINGS[1].name}`:base;
}
function itemDescription(u){
 if(u.kind==='global')return `所有鱼人产能 +${u.power}%，与其他补给乘算叠加。`;
 if(u.kind==='gold-frequency')return '幸运苹果与金苹果出现频率 ×2，留场时间 ×2；同类效果可叠加。';
 if(u.kind==='gold-duration')return '黄金狂热持续时间 ×2，今后领取金苹果可持续 120 秒。';
 if(u.kind==='mentor')return `${BUILDINGS[1].name}产能 ×2；每 ${u.building-1} 名社员让${BUILDINGS[u.building].name}产能 +1%。`;
 if(u.kind==='double')return u.building===0?'点击基础收益与兼职鱼人基础产能永久 ×2。':`${BUILDINGS[u.building].name}的产能永久 ×2。`;
 if(u.kind==='mouse')return '点击额外获得每秒产量的 1%，可与其他点击器叠加。';
 if(u.id==='fingers-0')return '每名其他鱼人使点击收益、每名兼职鱼人秒产各 +0.1。';
 return `「全员搭把手」的额外收益 ×${u.factor}。`;
}
function animateItemPurchase(id){
 const dialog=$('shopDialog');if(!dialog.open)return;
 const source=$('upgrades').querySelector(`[data-item="${id}"] .item-icon img`);
 if(!source)return;
 const target=$('viewItems'),from=source.getBoundingClientRect(),to=target.getBoundingClientRect(),area=dialog.getBoundingClientRect();
 const arrive=()=>{if(dialog.open)target.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:280,easing:'ease-out'})};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){arrive();return}
 const item=document.createElement('img');item.src=source.src;item.alt='';item.className='purchased-item-flight';
 item.style.cssText=`left:${from.left-area.left}px;top:${from.top-area.top}px;width:${from.width}px;height:${from.height}px`;
 dialog.append(item);
 const dx=to.left+to.width/2-from.left-from.width/2,dy=to.top+to.height/2-from.top-from.height/2;
 const flight=item.animate([
  {transform:'translate(0,0) scale(1)',opacity:1,offset:0},
  {transform:`translate(${dx*.2}px,${dy*.3-25}px) scale(1.12) rotate(-12deg)`,opacity:1,offset:.28},
  {transform:`translate(${dx}px,${dy}px) scale(.12) rotate(8deg)`,opacity:0,offset:1}
 ],{duration:700,easing:'cubic-bezier(.3,0,.65,1)',fill:'forwards'});
 flight.onfinish=()=>{item.remove();arrive()};flight.oncancel=()=>item.remove();
}
function renderVending(){
 const items=offers().slice(0,9),signature=items.map(u=>u.id).join('|');
 if(signature!==vendingSignature){
  vendingSignature=signature;
  const nodes=items.map(u=>{
   const slot=document.createElement('article');slot.className='vending-item';slot.dataset.item=u.id;
   const icon=document.createElement('button');icon.className='item-icon';icon.dataset.inspect=u.id;icon.setAttribute('aria-label',u.name+'，查看介绍');icon.setAttribute('aria-controls','itemDetail');
   const img=document.createElement('img');img.src=itemIcon(u.id);img.alt='';img.draggable=false;icon.append(img);
   const price=document.createElement('button');price.className='item-price';price.dataset.upgrade=u.id;price.setAttribute('aria-label',`购买${u.name}，${number(u.price)}苹果`);
   price.innerHTML='<svg viewBox="0 0 150 50" preserveAspectRatio="none" aria-hidden="true"><path d="M.5 .5H65Q75 12 85 .5H149.5V49.5H85Q75 38 65 49.5H.5Z" vector-effect="non-scaling-stroke"/></svg><span><img src="img/svg/apple.svg" alt=""><b></b></span>';
   price.querySelector('b').textContent=number(u.price);slot.append(icon,price);return slot;
  });
  $('upgrades').replaceChildren(...nodes);
 }
 if(selectedItem&&!items.some(u=>u.id===selectedItem))selectedItem=null;
 for(const u of items){const node=$('upgrades').querySelector(`[data-item="${u.id}"]`);node.querySelector('.item-price').disabled=state.apples+1e-9<u.price;node.querySelector('.item-icon').setAttribute('aria-expanded',String(selectedItem===u.id))}
 setText($('itemCount'),String(state.upgrades.length));$('emptyShop').hidden=items.length>0;
 const u=items.find(u=>u.id===selectedItem);$('itemDetail').hidden=!u;
 if(u){setText($('itemName'),u.name);setText($('itemPrice'),number(u.price));setText($('itemDescription'),itemDescription(u));$('buyItem').disabled=state.apples+1e-9<u.price}
}
function updateShopClearArea(){const r=document.querySelector('.rate').getBoundingClientRect();$('shopDialog').style.setProperty('--shop-clear-top',`${r.bottom+10}px`)}
window.addEventListener('resize',updateShopClearArea);
function openShop(){closeBuildingCard();updateShopClearArea();$('shopShade').hidden=false;document.querySelector('.phone').classList.add('shop-open');returnFocus=document.activeElement;selectedItem=null;$('shopDialog').showModal();render();$('closeShop').focus()}
function closeShop(){$('shopDialog').querySelectorAll('.purchased-item-flight').forEach(el=>{el.getAnimations().forEach(a=>a.cancel());el.remove()});$('shopDialog').close();$('shopShade').hidden=true;document.querySelector('.phone').classList.remove('shop-open');returnFocus?.focus()}
$('produce').addEventListener('click',produce);$('openShop').onclick=openShop;$('closeShop').onclick=closeShop;$('shopDialog').addEventListener('click',e=>{if(e.target===$('shopDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeShop()}});
$('shopDialog').addEventListener('cancel',()=>returnFocus?.focus());
$('shopDialog').addEventListener('close',()=>{$('shopShade').hidden=true;document.querySelector('.phone').classList.remove('shop-open')});
$('buildings').addEventListener('click',e=>{const el=e.target.closest('[data-building]');if(!el||el.disabled)return;
 const i=+el.dataset.building;
 if(infoBuilding!==i&&armedRecruit!==i){openBuildingCard(i);return}
 if(buyBuilding(i)){armedRecruit=state.apples+1e-9>=buildingCost(i)?i:null;closeBuildingCard(true)}else notify('苹果不够');
});
$('cardBuy').onclick=()=>{if(infoBuilding===null)return;if(!buyBuilding(infoBuilding))notify('苹果不够')};
document.addEventListener('pointerdown',e=>{
 if(infoBuilding===null&&armedRecruit===null)return;
 const tile=e.target.closest('[data-building]');
 if(tile&&(Number(tile.dataset.building)===armedRecruit||Number(tile.dataset.building)===infoBuilding))return;
 if(e.target.closest('#buildingCard')){armedRecruit=null;render();return}
 closeBuildingCard();
});
$('upgrades').addEventListener('click',e=>{const icon=e.target.closest('[data-inspect]');if(icon){selectedItem=selectedItem===icon.dataset.inspect?null:icon.dataset.inspect;renderVending();return}const b=e.target.closest('[data-upgrade]');if(b&&!b.disabled)buyUpgrade(b.dataset.upgrade)});
$('buyItem').onclick=()=>{if(selectedItem)buyUpgrade(selectedItem)};
$('openGacha').onclick=()=>notify('扭蛋机暂未开放');
document.querySelectorAll('[data-bulk]').forEach(b=>b.onclick=()=>{bulk=+b.dataset.bulk;render()});document.querySelectorAll('.placeholder').forEach(b=>b.onclick=()=>notify('这个功能稍后开放'));

$('restart').onclick=()=>{if(!confirm('确定重新开始？当前苹果、鱼人和升级进度将被清空。'))return;state=fresh();displayed=0;bulk=1;guestQueue=[];rateDeferred=0;rateRoll=0;rateFlights=0;closeBuildingCard();resetPurchaseSpeech();save();$('fx').replaceChildren();selectedItem=null;render();notify('新工厂已开工')};
function update(dt){balancePaintClock+=dt;const buffTime=Math.min(dt,state.events.frenzy),span=dt+6*buffTime;trackProduction(span);earn(baseCps()*span);updateEvents(dt);updateGoldRain(dt);driveGoldenDance(dt);driveTalk(dt);driveGuests(dt);driveRateRoll(dt);displayed+=(state.apples-displayed)*(1-Math.exp(-dt*14));if(Math.abs(state.apples-displayed)<.05)displayed=state.apples;saveClock+=dt;if(saveClock>=2){saveClock=0;save()}render()}
// A first rAF timestamp can precede script initialization. Never advance backwards.
function frame(now){const dt=last===null?0:Math.max(0,Math.min((now-last)/1000,.25));last=now;if(!document.hidden)update(dt);requestAnimationFrame(frame)}
document.addEventListener('visibilitychange',()=>{last=null;save()});window.addEventListener('pagehide',save);
window.advanceTime=ms=>{for(let left=ms;left>0;left-=50)update(Math.min(left,50)/1000)};
window.render_game_to_text=()=>JSON.stringify({apples:state.apples,total:state.total,events:state.events,goldenClicks:state.goldenClicks,globalMultiplier:upgradeEffects().global,cps:cps(),clickPower:clickPower(),bulk,buildings:BUILDINGS.map((b,i)=>({name:b.name,owned:state.owned[i],price:buildingCost(i),visible:visible(i)})),upgrades:state.upgrades,affordableUpgrade:offers().find(u=>u.price<=state.apples)?.id||null,prizes:state.prizes,shopOpen:$('shopDialog').open,vendingItems:offers().slice(0,9).map(u=>({id:u.id,name:u.name,price:u.price,affordable:state.apples>=u.price})),selectedItem});
render();requestAnimationFrame(frame);
// Commit the initial normal/buffed state before enabling color transitions.
requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove('game-booting')));

// Decorative assets must never initiate the browser's native image drag.
document.addEventListener('dragstart',event=>{if(event.target instanceof HTMLImageElement)event.preventDefault()});
document.querySelectorAll('img').forEach(img=>img.draggable=false);

document.addEventListener('selectstart',event=>event.preventDefault());
document.addEventListener('contextmenu',event=>event.preventDefault());

// Item catalogue (DEMO): every upgrade in the game, cheapest first, with the
// same blurb the vending machine shows. Display only — nothing is for sale
// here, and owning one only changes how its tile reads.
const CATALOG=[...UPGRADES].sort((a,b)=>a.price-b.price);
let catalogItem=null;
function renderCatalog(){
 if(!$('catalogDialog').open)return;
 setText($('catalogTotal'),number(CATALOG.length));
 setText($('catalogOwned'),number(state.upgrades.length));
 for(const node of $('catalogGrid').children){
  node.classList.toggle('owned',state.upgrades.includes(node.dataset.item));
  node.setAttribute('aria-expanded',String(catalogItem===node.dataset.item));
 }
 const u=CATALOG.find(u=>u.id===catalogItem);
 $('catalogDetail').hidden=!u;
 if(u){setText($('catalogName'),u.name);setText($('catalogPrice'),number(u.price));
  setText($('catalogDescription'),itemDescription(u));
  const owned=state.upgrades.includes(u.id),open=unlocked(u);
  setText($('catalogUnlock'),`解锁条件：${itemUnlock(u)}`);
  $('catalogUnlock').classList.toggle('met',open);
  const status=$('catalogStatus');
  setText(status,owned?'已拥有':open?'已解锁 · 可在贩卖机购买':'未解锁');
  status.dataset.state=owned?'owned':open?'open':'locked'}
}
function buildCatalog(){
 if($('catalogGrid').children.length)return;
 $('catalogGrid').replaceChildren(...CATALOG.map(u=>{
  const entry=document.createElement('button');
  entry.type='button';entry.className='catalog-item';entry.dataset.item=u.id;
  entry.setAttribute('aria-label',`${u.name}，${number(u.price)}苹果，查看介绍`);
  entry.setAttribute('aria-controls','catalogDetail');
  const img=document.createElement('img');img.src=itemIcon(u.id);img.alt='';img.draggable=false;
  const price=document.createElement('span');price.className='catalog-item-price';
  price.innerHTML='<img src="img/svg/apple.svg" alt=""><b></b>';
  price.querySelector('b').textContent=number(u.price);
  entry.append(img,price);
  return entry;
 }));
}
function openCatalog(){buildCatalog();catalogItem=null;returnFocus=document.activeElement;$('catalogDialog').showModal();renderCatalog();$('closeCatalog').focus()}
function closeCatalog(){$('catalogDialog').close();returnFocus?.focus()}
$('openCatalog').onclick=openCatalog;
$('closeCatalog').onclick=closeCatalog;
$('catalogDialog').addEventListener('cancel',()=>returnFocus?.focus());
$('catalogGrid').addEventListener('click',event=>{
 const entry=event.target.closest('[data-item]');if(!entry)return;
 catalogItem=catalogItem===entry.dataset.item?null:entry.dataset.item;
 renderCatalog();
});
