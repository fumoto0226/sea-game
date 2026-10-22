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
  "name": "农民鱼人",
  "original": "Grandma",
  "icon": "img/svg/fisher-staff.svg",
  "price": 100,
  "cps": 1,
  "desc": "戴上草帽，精耕细作，让每一片果园都结满苹果。",
  "workerLook": "farmer"
 },
 {
  "name": "鱼人社员",
  "original": "Farm",
  "icon": "img/svg/fisher-influencer.svg",
  "price": 1100,
  "cps": 8,
  "desc": "正式入职，工牌一戴，稳定产出的日子开始了。",
  "workerLook": "navy-suit"
 },
 {
  "name": "国王鱼人",
  "workerLook": "ivory-king",
  "original": "Mine",
  "icon": "img/svg/fisher-mutant.svg",
  "price": 12000,
  "cps": 47,
  "desc": "王冠之下，整座果园都听从他的号令。"
 },
 {
  "name": "鲨鱼鱼人",
  "workerLook": "shark-suit",
  "original": "Factory",
  "icon": "img/svg/fisher-sponge.svg",
  "price": 130000,
  "cps": 260,
  "desc": "循着苹果的香气出击，用锋利的鱼鳍高效收获。"
 },
 {
  "name": "小丑鱼人",
  "workerLook": "clown-suit",
  "original": "Bank",
  "icon": "img/svg/fisher-clown.svg",
  "price": 1400000,
  "cps": 1400,
  "desc": "用杂耍接住每颗苹果，把果园变成欢乐舞台。"
 },
 {
  "name": "变异鱼人",
  "original": "Temple",
  "icon": "img/svg/fisher-king.svg",
  "price": 20000000,
  "cps": 7800,
  "desc": "多长出来的触手，各自负责一条苹果生产线。",
  "workerLook": "milk-frog"
 },
 {
  "name": "外星鱼人",
  "workerLook": "alien",
  "original": "Wizard tower",
  "icon": "img/svg/fisher-alien.svg",
  "price": 330000000,
  "cps": 44000,
  "desc": "从遥远星系赶来，用外星科技培育苹果。"
 },
 {
  "name": "海绵鱼人",
  "original": "Shipment",
  "icon": "img/svg/fisher-hero.svg",
  "price": 5100000000,
  "cps": 260000,
  "desc": "吸收海里的养分，把苹果种得饱满又多汁。"
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
const RETIRED_ITEM_IDS={"tier-2-0": "tier-farmer-0", "tier-2-1": "tier-farmer-1", "tier-2-2": "tier-farmer-2", "tier-2-3": "tier-farmer-3", "tier-2-4": "tier-farmer-4", "tier-2-5": "tier-farmer-5", "tier-2-6": "tier-farmer-6", "tier-2-7": "tier-farmer-7", "tier-2-8": "tier-farmer-8", "tier-2-9": "tier-farmer-9", "tier-2-10": "tier-farmer-10", "tier-2-11": "tier-farmer-11", "tier-2-12": "tier-farmer-12", "tier-2-13": "tier-farmer-13", "tier-2-14": "tier-farmer-14", "tier-8-0": "tier-shark-0", "tier-8-1": "tier-shark-1", "tier-8-2": "tier-shark-2", "tier-8-3": "tier-shark-3", "tier-8-4": "tier-shark-4", "tier-8-5": "tier-shark-5", "tier-8-6": "tier-shark-6", "tier-8-7": "tier-shark-7", "tier-8-8": "tier-shark-8", "tier-8-9": "tier-shark-9", "tier-8-10": "tier-shark-10", "tier-8-11": "tier-shark-11", "tier-8-12": "tier-shark-12", "tier-8-13": "tier-shark-13", "tier-8-14": "tier-shark-14", "mentor-2": "mentor-staff", "mentor-8": "mentor-shark", "supply-gingerbread-trees": "supply-farmer-0", "supply-pure-black-chocolate-cookies": "supply-farmer-1", "supply-pure-white-chocolate-cookies": "supply-farmer-2", "supply-ladyfingers": "supply-farmer-3", "supply-tuiles": "supply-farmer-4", "supply-chocolate-stuffed-biscuits": "supply-farmer-5", "supply-checker-cookies": "supply-farmer-6", "supply-butter-cookies": "supply-farmer-7", "supply-cream-cookies": "supply-farmer-8", "supply-gingersnaps": "supply-farmer-9", "supply-cinnamon-cookies": "supply-farmer-10", "supply-vanity-cookies": "supply-farmer-11", "supply-cigars": "supply-farmer-12", "supply-pinwheel-cookies": "supply-farmer-13", "supply-vanillekipferl": "supply-shark-0", "supply-battenberg-biscuits": "supply-shark-1", "supply-rosette-cookies": "supply-shark-2", "supply-gangmakers": "supply-shark-3", "supply-welsh-cookies": "supply-shark-4", "supply-raspberry-cheesecake-cookies": "supply-shark-5", "supply-bokkenpootjes": "supply-shark-6", "supply-fat-rascals": "supply-shark-7", "supply-ischler-cookies": "supply-shark-8", "supply-matcha-cookies": "supply-shark-9", "supply-dalgona-cookies": "supply-shark-10", "supply-spicy-cookies": "supply-shark-11", "supply-smile-cookies": "supply-shark-12", "supply-kolachy-cookies": "supply-shark-13"};
const FACTORY_RESERVED_RECRUITS=[3,6,10];
function migrateFactorySteps(v){
 if(v.factoryPlan===2)return v.factorySteps||0;
 const n=(v.upgrades||[]).filter(id=>UPGRADES.some(u=>u.id===(RETIRED_ITEM_IDS[id]||id)&&u.kind==='global')).length;
 const old=Number.isInteger(v.factorySteps)?v.factorySteps:n>=26?33:n>=11?13+Math.floor((n-11)/15*20):n>=3?3+Math.floor((n-3)/8*10):n;
 return old>=33?19:old>=13?9+Math.floor((old-13)/20*10):old>=3?3+Math.floor((old-3)/10*6):old;
}
const fresh=()=>({apples:0,total:0,handmade:0,playSeconds:0,levelTimes:{},guaranteedGold:freshGuaranteedGold(),factoryPlan:2,factorySteps:0,gifted:BUILDINGS.map(()=>0),goldenClicks:0,owned:BUILDINGS.map(()=>0),upgrades:[],outfit:null,prizes:[0,0,0],draws:0,events:freshEvents()});
let state=fresh(),bulk=1,displayed=0,last=null,saveClock=0,toastTimer,returnFocus;
try{const data=JSON.parse(localStorage.getItem(KEY));if(data?.version===1){const v=data.state;if(Number.isFinite(v.apples)&&v.apples>=0&&Array.isArray(v.owned)&&[5,BUILDINGS.length].includes(v.owned.length)&&v.owned.every(n=>Number.isInteger(n)&&n>=0)){state={...fresh(),...v,guaranteedGold:v.guaranteedGold,owned:BUILDINGS.map((_,i)=>v.owned[i]||0),factoryPlan:2,factorySteps:migrateFactorySteps(v),legacyClickUpgrades:Math.max(v.legacyClickUpgrades||0,(v.upgrades||[]).filter(id=>/^mouse-\d+$/.test(id)).length),upgrades:[...new Set((v.upgrades||[]).map(id=>RETIRED_ITEM_IDS[id]||id))].filter(id=>UPGRADES.some(u=>u.id===id))};
// Temporary bonuses expire in real time, before the first render. Legacy saves
// have no trustworthy deadline, so discard only their temporary frenzy.
state.events={...freshEvents(),...state.events,frenzy:Number.isFinite(data.frenzyExpiresAt)?Math.max(0,Math.min(60,(data.frenzyExpiresAt-Date.now())/1000)):0};}}}catch{}
state.events={...freshEvents(),...state.events};
state.upgrades=state.upgrades.filter(id=>UPGRADES.some(u=>u.id===id));
state.gifted=BUILDINGS.map((_,i)=>Math.max(0,Math.min(state.owned[i],Number.isSafeInteger(state.gifted?.[i])?state.gifted[i]:0)));
state.factorySteps=Math.max(0,Math.min(19,Number.isInteger(state.factorySteps)?state.factorySteps:0));
state.events.frenzy=Math.min(60,state.events.frenzy);
state.events.frenzyDuration=60;
if(state.events.active)state.events.active.remaining=Math.min(13,state.events.active.remaining);
state.goldenClicks=Number.isSafeInteger(state.goldenClicks)&&state.goldenClicks>=0?state.goldenClicks:0;
state.events.frenzyDuration=state.events.frenzyDuration===120?120:60;
state.playSeconds=Number.isFinite(state.playSeconds)&&state.playSeconds>=0?state.playSeconds:0;
// When each factory level was first reached, in seconds of this round.
state.levelTimes=state.levelTimes&&typeof state.levelTimes==='object'?state.levelTimes:{};
for(const key of Object.keys(state.levelTimes))if(!Number.isFinite(state.levelTimes[key]))delete state.levelTimes[key];
state.guaranteedGold=[ [60,120],[240,300] ].map(([min,max],i)=>{
 const old=state.guaranteedGold?.[i];
 return old&&Number.isFinite(old.at)&&old.at>=min&&old.at<=max?old:{at:min+Math.random()*(max-min),spawned:state.playSeconds>=max,active:null};
});
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
let effectSource=null,effectCount=-1,effectFactory=-1,effectCache;
function upgradeEffects(){
 if(effectSource===state.upgrades&&effectCount===state.upgrades.length&&effectFactory===state.factorySteps)return effectCache;
 effectSource=state.upgrades;effectCount=state.upgrades.length;effectFactory=state.factorySteps;
 const owned=new Set(state.upgrades),effects={doubles:BUILDINGS.map(()=>1),mentors:new Set(),fingers:0,mouse:0,global:1};
 effects.doubles[0]=2**(factoryProgress().level-1);
 let fingerFactor=1;
 for(const u of UPGRADES){if(!owned.has(u.id))continue;
  if(u.kind==='double')effects.doubles[u.building]*=2;
  else if(u.kind==='mentor')effects.mentors.add(u.building);
  else if(u.kind==='fingers')fingerFactor*=u.factor;
  else if(u.kind==='mouse')effects.mouse++;
  if(u.clickPercent)effects.mouse+=u.clickPercent;
  else if(u.kind==='global'||u.kind==='fish-global')effects.global*=1+u.power/100;
  if(u.globalBonus)effects.global*=1+u.globalBonus/100;
 }
 effects.mouse=Math.max(effects.mouse,Math.min(18,state.legacyClickUpgrades||0));
 effects.fingers=UPGRADES.some(u=>u.kind==='fingers'&&u.synergyIndex===0&&owned.has(u.id))?.1*fingerFactor:0;
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
function productionNumber(n){
 if(!Number.isFinite(n))return '∞';
 const units=['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg','UVg','DVg','TVg'];
 let value=Math.abs(n),tier=0;
 while(value>=1000&&tier<units.length-1){value/=1000;tier++}
 for(;;){
  const suffix=units[tier],limit=4-suffix.length;
  let label=Number(value.toFixed(1)).toString();
  if(label.length>limit)label=Math.round(value).toString();
  if((label.length>4-suffix.length||Number(label)>=1000)&&tier<units.length-1){value/=1000;tier++;continue}
  return (n<0?'-':'')+label+suffix;
 }
}
// Original bulk pricing sums unrounded prices, then rounds the complete batch up.
function buildingCost(i,n=bulk){let sum=0;for(let k=0;k<n;k++)sum+=BUILDINGS[i].price*1.15**((FACTORY_RESERVED_RECRUITS[i]||0)+state.owned[i]-(state.gifted[i]||0)+k);return Math.ceil(sum)}
// Factory level gates shop access; the first three recruitment slots are reserved for factory purchases.
const visible=i=>i===0||factoryProgress().level>=(i===1?2:i===2?3:4);
const unlocked=u=>{
 if(u.kind==='factory-recruit')return true;
 if(u.kind==='global')return state.total>=u.earned;
 if(u.kind==='mouse')return (state.handmade||0)>=u.handmade;
 return state.owned[u.building]>=u.need&&(u.kind!=='mentor'||state.owned[1]>0);
};
const isFishUpgrade=u=>['double','mentor','fingers','fish-global'].includes(u.kind);
const offers=()=>UPGRADES.filter(u=>isFishUpgrade(u)&&unlocked(u)&&!state.upgrades.includes(u.id)).sort((a,b)=>a.price-b.price);
const fishUpgrade=i=>{let next=null;for(const u of UPGRADES)if(isFishUpgrade(u)&&(u.kind==='fingers'?0:u.building)===i&&!state.upgrades.includes(u.id)&&unlocked(u)&&(!next||u.price<next.price))next=u;return next};
const fishItems=i=>UPGRADES.filter(u=>isFishUpgrade(u)&&(u.kind==='fingers'?0:u.building)===i);
const fishLevel=i=>1+fishItems(i).filter(u=>state.upgrades.includes(u.id)).length;
const factoryItems=UPGRADES.filter(u=>u.kind==='global').sort((a,b)=>a.price-b.price);
const FACTORY_RECRUIT_STEPS=FACTORY_RESERVED_RECRUITS.flatMap((count,building)=>
 Array.from({length:count},(_,i)=>({id:`factory-recruit-${building}-${i}`,name:'工厂升级',kind:'factory-recruit',building,count:1,price:Math.ceil(BUILDINGS[building].price*1.15**i)}))
);
function factoryProgress(){
 const steps=state.factorySteps;
 if(steps<3)return {stage:0,level:1,done:steps,total:3,complete:false,enhancing:false};
 if(steps<9)return {stage:1,level:2,done:steps-3,total:6,complete:false,enhancing:false};
 if(steps<19)return {stage:2,level:3,done:steps-9,total:10,complete:false,enhancing:false};
 const done=factoryItems.filter(u=>state.upgrades.includes(u.id)).length;
 return {stage:3,level:4,done,total:factoryItems.length,complete:done===factoryItems.length,enhancing:true};
}
const nextFactoryItem=()=>FACTORY_RECRUIT_STEPS[state.factorySteps]||factoryItems.find(u=>!state.upgrades.includes(u.id))||null;
let upgradeFish=null;

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
function swingRecruitTag(i){
 const motion=document.querySelector(`[data-building="${i}"] .tag-motion`);
 if(!motion||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 motion.getAnimations().forEach(a=>a.cancel());
 const svg=motion.querySelector('svg'),box=svg.getBoundingClientRect(),frame=motion.getBoundingClientRect();
 const points=[...svg.querySelector('path').getAttribute('d').matchAll(/M([\d.]+) ([\d.]+)/g)],hole=points[1],view=svg.viewBox.baseVal;
 motion.style.transformOrigin=`${box.left-frame.left+Number(hole[1])*box.width/view.width}px ${box.top-frame.top+(Number(hole[2])+1.385)*box.height/view.height}px`;
 motion.animate([{transform:'rotate(0deg)'},{transform:'rotate(-12deg)',offset:.16},{transform:'rotate(9deg)',offset:.38},{transform:'rotate(-5deg)',offset:.6},{transform:'rotate(2deg)',offset:.8},{transform:'rotate(0deg)'}],{duration:700,easing:'ease-in-out'});
}
function buyBuilding(i){if(!visible(i)||!spend(buildingCost(i)))return false;state.owned[i]+=bulk;swingRecruitTag(i);syncRecruitGains();greetPurchase();queueWorkers(bulk,unitCps(i),i);save();render();notify(`${BUILDINGS[i].name} +${bulk} · 每秒产量 +${productionNumber(currentUnitCps(i)*bulk)} 苹果`);return true}
function buyUpgrade(id){
 const next=nextFactoryItem(),u=UPGRADES.find(x=>x.id===id)||(next?.id===id?next:null);
 if(!u||!(isFishUpgrade(u)||(['global','factory-recruit'].includes(u.kind)&&next?.id===u.id))||!unlocked(u)||state.upgrades.includes(id)||!spend(u.price))return false;
 if(u.kind==='factory-recruit'){
  state.factorySteps++;state.owned[u.building]+=u.count;state.gifted[u.building]+=u.count;
  syncRecruitGains();queueWorkers(u.count,unitCps(u.building),u.building);
 }else {animateItemPurchase(id);state.upgrades.push(id);syncRecruitGains()}
 save();render();notify(u.kind==='factory-recruit'?`${BUILDINGS[u.building].name} +${u.count}`:u.kind==='global'?'工厂强化进度 +1':BUILDINGS[u.kind==='fingers'?0:u.building].name+'升级成功');return true;
}
function clickEffects(event,n){
 const r=$('produce').getBoundingClientRect(),scale=document.querySelector('.phone').clientWidth/400;
 const pointer=event&&event.detail>0&&Number.isFinite(event.clientX);
 const x=pointer?event.clientX:r.left+r.width/2,y=pointer?event.clientY:r.top+r.height/2;
 const f=document.createElement('span');f.className='click-number';if(state.events.frenzy>0){f.classList.add('frenzy-number');const glyph=document.createElement('span');glyph.className='reward-impact';glyph.textContent='+'+number(n);f.append(glyph)}else f.textContent='+'+number(n);
 f.style.left=x+(Math.random()-.5)*6+'px';f.style.top=y-22*scale+'px';f.style.fontSize=Math.max(16,26*scale)+'px';const duration=(1550+Math.random()*180)/1.2;const startSpeed=90/1.05*1.2,time=duration/1000,distance=startSpeed*time+55*scale;f.style.setProperty('--rise-distance',distance+'px');const slope=startSpeed*time/distance;f.style.setProperty('--rise-ease',`cubic-bezier(.333333,${slope/3},.666667,${(1+slope)/3})`);f.style.animationDuration=duration+'ms';
 // The frenzy halo travels as its own copy underneath the glyph: as a direct
 // child of the effects layer it can blend additively with the other halos.
 if(f.classList.contains('frenzy-number')){const glow=f.cloneNode(true);glow.classList.add('frenzy-glow');glow.setAttribute('aria-hidden','true');$('fx').append(glow);setTimeout(()=>glow.remove(),duration+60)}
 $('fx').append(f);setTimeout(()=>f.remove(),duration+60);
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

const FISH_TAGS=["<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"37\" height=\"37\" viewBox=\"0 0 37 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#fishTag1_filter0_d_699_30745)\">\n<path d=\"M18.116 0.200195C28.0104 0.200195 36.032 8.22174 36.032 18.1162C36.0317 28.0105 28.0103 36.0312 18.116 36.0312C8.22166 36.0312 0.201192 28.0105 0.200928 18.1162C0.200928 8.22174 8.22149 0.200195 18.116 0.200195ZM18.1873 2.12012C17.4226 2.12012 16.8026 2.74019 16.8025 3.50488C16.8025 4.26963 17.4225 4.88965 18.1873 4.88965C18.9519 4.88956 19.572 4.26958 19.572 3.50488C19.5719 2.74025 18.9519 2.1202 18.1873 2.12012Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M12.4696 11.4342C10.4861 14.49 9.88381 18.9438 10.0741 24.3173L10.2032 26.055C13.0588 26.6822 20.4016 27.5426 26.0206 25.6113C26.1529 24.5229 26.1529 24.0492 26.1529 23.7743C26.1529 21.8295 26.4264 20.4687 25.5084 16.0261C24.5904 11.5834 19.5598 7.03068 17.0754 6.77686L15.4974 13.886C14.4455 13.3057 13.3936 12.3264 12.4696 11.4342Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M30.4333 18.4961C29.2855 17.9173 26.6919 16.6174 25.5009 16.0479L25.1909 18.3251L26.2315 22.1052L30.4333 18.4961Z\" fill=\"#C5C5C5\"/>\n<path d=\"M10.0741 24.3173C9.88381 18.9438 10.4861 14.49 12.4696 11.4342C13.3936 12.3264 14.4455 13.3057 15.4974 13.886L17.0754 6.77686C19.5598 7.03068 24.5904 11.5834 25.5084 16.0261C26.4264 20.4687 26.1529 21.8295 26.1529 23.7743\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M19.5238 17.372C18.8224 16.6029 18.947 15.4078 20.0816 14.5403C20.9908 13.8528 22.8422 13.682 23.5154 15.1762C24.1886 16.6704 22.532 17.6946 22.007 17.9035C21.482 18.1123 20.2252 18.1411 19.5238 17.372Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"21.3743\" cy=\"15.8355\" rx=\"0.50882\" ry=\"0.458749\" transform=\"rotate(-14.9815 21.3743 15.8355)\" fill=\"black\"/>\n<path d=\"M25.501 16.0479C26.6921 16.6174 29.2856 17.9173 30.4334 18.4961L26.2316 22.1052\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag1_filter0_d_699_30745\" x=\"0\" y=\"0\" width=\"36.5156\" height=\"36.7988\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30745\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30745\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"37\" height=\"37\" viewBox=\"0 0 37 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n<g filter=\"url(#fishTag2_filter0_d_699_30784)\">\n<path d=\"M18.115 0.200195C28.0095 0.200195 36.031 8.22174 36.031 18.1162C36.0307 28.0105 28.0093 36.0312 18.115 36.0312C8.22068 36.0312 0.199238 28.0105 0.198975 18.1162C0.198975 8.22174 8.22052 0.200195 18.115 0.200195ZM18.1863 2.12012C17.4216 2.12012 16.8016 2.74019 16.8015 3.50488C16.8015 4.26963 17.4215 4.88965 18.1863 4.88965C18.951 4.88956 19.571 4.26958 19.571 3.50488C19.571 2.74025 18.9509 2.1202 18.1863 2.12012Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M11.9878 11.5187C10.2626 14.1766 9.73872 18.0505 9.90421 22.7243L10.0165 24.2358C12.5003 24.7813 18.887 25.5296 23.7744 23.8498C23.8894 22.9032 23.8894 22.4911 23.8894 22.2521C23.8894 20.5605 24.1274 19.3769 23.3289 15.5127C22.5304 11.6485 18.1549 7.68855 15.9939 7.46777L14.6214 13.6513C13.7065 13.1465 12.7915 12.2947 11.9878 11.5187Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M27.6125 17.6612C26.6141 17.1578 24.3583 16.0272 23.3223 15.5317L23.0527 17.5125L23.9578 20.8004L27.6125 17.6612Z\" fill=\"#C5C5C5\"/>\n<path d=\"M9.90421 22.7243C9.73872 18.0505 10.2626 14.1766 11.9878 11.5187C12.7915 12.2947 13.7065 13.1465 14.6214 13.6513L15.9939 7.46777C18.1549 7.68855 22.5304 11.6485 23.3289 15.5127C24.1274 19.3769 23.8894 20.5605 23.8894 22.2521\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M18.1234 16.6833C17.5133 16.0144 17.6217 14.9749 18.6086 14.2204C19.3994 13.6224 21.0097 13.4738 21.5953 14.7735C22.1808 16.0731 20.74 16.964 20.2833 17.1456C19.8266 17.3273 18.7335 17.3523 18.1234 16.6833Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"19.7331\" cy=\"15.3467\" rx=\"0.442569\" ry=\"0.399017\" transform=\"rotate(-14.9815 19.7331 15.3467)\" fill=\"black\"/>\n<path d=\"M23.3225 15.5317C24.3585 16.0272 26.6143 17.1578 27.6127 17.6612L23.958 20.8004\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<use xlink:href=\"#fishTag2_stroke0_699_30784\" fill=\"#FCDD43\"/>\n<mask id=\"fishTag2_stroke1_699_30784\" fill=\"white\">\n<use xlink:href=\"#fishTag2_stroke0_699_30784\"/>\n</mask>\n<path d=\"M26.5083 17.6808C26.4445 22.9966 25.1719 27.2912 23.666 27.2731C22.16 27.2551 20.9909 22.9311 21.0548 17.6153C21.1186 12.2995 22.3912 8.0049 23.8972 8.02299C25.4031 8.04108 26.5722 12.365 26.5083 17.6808Z\" stroke-width=\"0.78\" stroke=\"black\" mask=\"url(#fishTag2_stroke1_699_30784)\"/>\n<use xlink:href=\"#fishTag2_stroke2_699_30784\" fill=\"#FCDD43\"/>\n<mask id=\"fishTag2_stroke3_699_30784\" fill=\"white\">\n<use xlink:href=\"#fishTag2_stroke2_699_30784\"/>\n</mask>\n<path d=\"M30.2398 18.4786C29.979 20.7672 28.269 22.4516 26.4206 22.2409C24.5721 22.0302 23.2851 20.0042 23.546 17.7156C23.8068 15.427 25.5168 13.7426 27.3652 13.9533C29.2137 14.164 30.5007 16.1901 30.2398 18.4786Z\" stroke-width=\"0.78\" stroke=\"black\" mask=\"url(#fishTag2_stroke3_699_30784)\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag2_filter0_d_699_30784\" x=\"0\" y=\"0\" width=\"36.5146\" height=\"36.7988\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30784\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30784\" result=\"shape\"/>\n</filter>\n<path id=\"fishTag2_stroke0_699_30784\" d=\"M26.5083 17.6808C26.4445 22.9966 25.1719 27.2912 23.666 27.2731C22.16 27.2551 20.9909 22.9311 21.0548 17.6153C21.1186 12.2995 22.3912 8.0049 23.8972 8.02299C25.4031 8.04108 26.5722 12.365 26.5083 17.6808Z\"/>\n<path id=\"fishTag2_stroke2_699_30784\" d=\"M30.2398 18.4786C29.979 20.7672 28.269 22.4516 26.4206 22.2409C24.5721 22.0302 23.2851 20.0042 23.546 17.7156C23.8068 15.427 25.5168 13.7426 27.3652 13.9533C29.2137 14.164 30.5007 16.1901 30.2398 18.4786Z\"/>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"40\" height=\"37\" viewBox=\"0 0 40 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#fishTag3_filter0_d_699_30650)\">\n<path d=\"M14.1104 3.17676C16.5258 -0.792087 22.2876 -0.792068 24.7031 3.17676L31.5342 14.4023L31.5391 14.4102L37.8447 25.9395C40.0739 30.0158 37.1928 35.005 32.5479 35.1123L19.4111 35.416H19.4023L6.26465 35.1123C1.6197 35.0048 -1.26086 30.0148 0.96875 25.9385L7.27441 14.4102L7.27832 14.4023H7.2793L14.1104 3.17676ZM19.4062 2.16895C18.6416 2.16907 18.0215 2.78904 18.0215 3.55371C18.0215 4.31838 18.6416 4.93835 19.4062 4.93848C20.171 4.93848 20.791 4.31846 20.791 3.55371C20.791 2.78896 20.171 2.16895 19.4062 2.16895Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M14.1052 10.9299C12.2449 13.7961 11.6799 17.9736 11.8584 23.0137L11.9795 24.6436C14.6579 25.2319 21.5451 26.0389 26.8156 24.2274C26.9396 23.2066 26.9396 22.7622 26.9396 22.5044C26.9396 20.6803 27.1962 19.4039 26.3351 15.2369C25.4741 11.0699 20.7556 6.7996 18.4253 6.56152L16.9452 13.2296C15.9586 12.6853 14.972 11.7667 14.1052 10.9299Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M30.9545 17.5536C29.8779 17.0108 27.4452 15.7916 26.3281 15.2573L26.0374 17.3933L27.0134 20.9388L30.9545 17.5536Z\" fill=\"#C5C5C5\"/>\n<path d=\"M11.8584 23.0137C11.6799 17.9736 12.2449 13.7961 14.1052 10.9299C14.972 11.7667 15.9586 12.6853 16.9452 13.2296L18.4253 6.56152C20.7556 6.7996 25.4741 11.0699 26.3351 15.2369C27.1962 19.4039 26.9396 20.6803 26.9396 22.5044\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M20.7217 16.4993C20.0638 15.7779 20.1808 14.657 21.2449 13.8433C22.0977 13.1984 23.8342 13.0383 24.4657 14.4398C25.0971 15.8413 23.5433 16.802 23.0509 16.9978C22.5584 17.1937 21.3796 17.2207 20.7217 16.4993Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"22.4573\" cy=\"15.0584\" rx=\"0.477252\" ry=\"0.430288\" transform=\"rotate(-14.9815 22.4573 15.0584)\" fill=\"black\"/>\n<path d=\"M26.3281 15.2573C27.4453 15.7916 29.8779 17.0108 30.9545 17.5536L27.0135 20.9388\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M22.2949 26.5998H15.874L16.6989 22.9082H21.2937L22.2949 26.5998Z\" fill=\"#CED2D2\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M21.9606 27.3796L20.9219 22.8787L26.7354 21.917L27.8894 24.1482L21.9606 27.3796Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M21.9606 27.3796L20.9219 22.8787L26.7354 21.917L27.8894 24.1482L21.9606 27.3796Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M16.0865 27.3797L17.1252 22.8788L11.8821 21.917L10.728 24.1482L16.0865 27.3797Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M20.0457 24.0156V26.4131H20.0447L19.0242 27.8809L18.0046 26.4131H18.0037V24.0176L17.2791 23.0137H20.7693L20.0457 24.0156Z\" fill=\"#FF0000\"/>\n<mask id=\"fishTag3_stroke0_699_30650\" maskUnits=\"userSpaceOnUse\" x=\"16.2791\" y=\"22.0137\" width=\"6\" height=\"7\" fill=\"black\">\n<rect fill=\"white\" x=\"16.2791\" y=\"22.0137\" width=\"6\" height=\"7\"/>\n<path d=\"M20.0457 24.0156V26.4131H20.0447L19.0242 27.8809L18.0046 26.4131H18.0037V24.0176L17.2791 23.0137H20.7693L20.0457 24.0156Z\"/>\n</mask>\n<path d=\"M20.0457 24.0156V26.4131H20.0447L19.0242 27.8809L18.0046 26.4131H18.0037V24.0176L17.2791 23.0137H20.7693L20.0457 24.0156Z\" stroke-width=\"0.8\" stroke=\"black\" mask=\"url(#fishTag3_stroke0_699_30650)\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag3_filter0_d_699_30650\" x=\"0\" y=\"0\" width=\"39.0972\" height=\"36.1836\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30650\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30650\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"40\" height=\"37\" viewBox=\"0 0 40 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#fishTag4_filter0_d_699_30692)\">\n<path d=\"M14.1104 3.17676C16.5258 -0.792087 22.2876 -0.792068 24.7031 3.17676L31.5342 14.4023L31.5391 14.4102L37.8447 25.9395C40.0739 30.0158 37.1928 35.005 32.5479 35.1123L19.4111 35.416H19.4023L6.26465 35.1123C1.6197 35.0048 -1.26086 30.0148 0.96875 25.9385L7.27441 14.4102L7.27832 14.4023H7.2793L14.1104 3.17676ZM19.4062 2.16895C18.6416 2.16907 18.0215 2.78904 18.0215 3.55371C18.0215 4.31838 18.6416 4.93835 19.4062 4.93848C20.171 4.93848 20.791 4.31846 20.791 3.55371C20.791 2.78896 20.171 2.16895 19.4062 2.16895Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M13.9539 11.9107C12.0965 14.7724 11.5325 18.9431 11.7106 23.9752L11.8316 25.6026C14.5057 26.1899 21.3819 26.9956 26.6439 25.187C26.7678 24.1678 26.7678 23.7242 26.7678 23.4668C26.7678 21.6455 27.0239 20.3712 26.1643 16.2108C25.3046 12.0505 20.5937 7.78701 18.2671 7.54932L16.7894 14.2068C15.8043 13.6633 14.8193 12.7462 13.9539 11.9107Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M26.702 22.6644C26.6164 21.0799 26.3785 17.5388 26.1099 16.0505L29.5672 15.6794L28.4935 17.8572L31.4796 18.6502L28.6031 20.2245L31.043 22.0877L26.702 22.6644Z\" fill=\"#FFD400\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<circle cx=\"29.7756\" cy=\"15.5981\" r=\"0.66988\" transform=\"rotate(-1.20171 29.7756 15.5981)\" fill=\"#FFD400\" stroke=\"black\" stroke-width=\"0.4\"/>\n<circle cx=\"31.5432\" cy=\"18.5702\" r=\"0.66988\" transform=\"rotate(-1.20171 31.5432 18.5702)\" fill=\"#FFD400\" stroke=\"black\" stroke-width=\"0.4\"/>\n<circle cx=\"30.946\" cy=\"22.0116\" r=\"0.66988\" transform=\"rotate(-1.20171 30.946 22.0116)\" fill=\"#FFD400\" stroke=\"black\" stroke-width=\"0.4\"/>\n<path d=\"M14.0088 11.7549C12.1514 14.6166 11.5874 18.7874 11.7656 23.8194L11.8865 25.4468C14.5606 26.0341 21.4369 26.8398 26.6989 25.0313C26.8227 24.0121 26.8227 23.5684 26.8227 23.311C26.8227 21.4898 27.0789 20.2154 26.2192 16.0551C25.3595 11.8947 20.6486 7.63125 18.322 7.39355L16.8443 14.051C15.8592 13.5076 14.8742 12.5904 14.0088 11.7549Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M11.7656 23.8194C11.5874 18.7874 12.1514 14.6166 14.0088 11.7549C14.8742 12.5904 15.8592 13.5076 16.8443 14.051L18.322 7.39355C20.6486 7.63125 25.3595 11.8947 26.2192 16.0551C27.0789 20.2154 26.8227 21.4898 26.8227 23.311\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M20.6147 17.3157C19.9578 16.5954 20.0746 15.4763 21.137 14.664C21.9884 14.0201 23.7222 13.8602 24.3526 15.2594C24.9831 16.6587 23.4318 17.6179 22.9401 17.8134C22.4485 18.009 21.2715 18.0359 20.6147 17.3157Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"22.348\" cy=\"15.8768\" rx=\"0.47649\" ry=\"0.429601\" transform=\"rotate(-14.9815 22.348 15.8768)\" fill=\"black\"/>\n<path d=\"M16.2845 24.3418C15.8925 23.9499 12.012 22.9395 11.1756 23.656C10.3392 24.3726 10.8003 25.4344 11.5629 25.8112C14.8977 27.4596 23.9846 26.9182 26.9508 25.7356C27.7071 25.4341 28.2418 24.2125 27.4581 23.5267C26.6744 22.841 23.191 23.6757 21.8195 24.4594C20.595 23.7247 17.0193 23.9009 16.2845 24.3418Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag4_filter0_d_699_30692\" x=\"0\" y=\"0\" width=\"39.0972\" height=\"36.1836\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30692\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30692\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"35\" height=\"37\" viewBox=\"0 0 35 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#fishTag5_filter0_d_699_30577)\">\n<path d=\"M28.4832 0.200195C31.7969 0.200195 34.4832 2.88649 34.4832 6.2002V29.3682C34.4829 32.6816 31.7967 35.3682 28.4832 35.3682H6.19995C2.88631 35.3681 0.199951 32.6808 0.199951 29.3672V6.2002C0.199951 2.88654 2.88631 0.200274 6.19995 0.200195H28.4832ZM16.9988 2.12012C16.2341 2.12012 15.6141 2.74019 15.614 3.50488C15.614 4.26963 16.234 4.88965 16.9988 4.88965C17.7635 4.88956 18.3835 4.26958 18.3835 3.50488C18.3835 2.74025 17.7634 2.1202 16.9988 2.12012Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M13.3994 7.21875C14.1457 7.27119 16.0214 7.37207 16.1608 7.35637L15.8127 8.5166L13.3994 7.21875Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M13.1646 8.34326C13.9108 8.3957 15.7866 8.49658 15.9259 8.48088L15.5778 9.64111L13.1646 8.34326Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M12.7896 9.64111C13.5358 9.69355 15.4116 9.79443 15.5509 9.77873L15.2028 10.939L12.7896 9.64111Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M12.5801 10.939C13.3263 10.9914 15.2021 11.0923 15.3415 11.0766L14.9933 12.2368L12.5801 10.939Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M11.2436 11.5166C9.29078 14.5253 8.69775 18.9103 8.88508 24.2008L9.01223 25.9118C11.8237 26.5293 19.0532 27.3764 24.5855 25.4749C24.7157 24.4034 24.7157 23.9369 24.7157 23.6663C24.7157 21.7515 24.985 20.4117 24.0812 16.0376C23.1774 11.6636 18.2244 7.18106 15.7783 6.93115L14.2247 13.9306C13.1891 13.3592 12.1534 12.395 11.2436 11.5166Z\" fill=\"#2475C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M28.9303 18.4695C27.8002 17.8997 25.2467 16.6199 24.074 16.0591L23.7688 18.3012L24.7933 22.0229L28.9303 18.4695Z\" fill=\"#2475C5\"/>\n<path d=\"M8.88508 24.2008C8.69775 18.9103 9.29078 14.5253 11.2436 11.5166C12.1534 12.395 13.1891 13.3592 14.2247 13.9306L15.7783 6.93115C18.2244 7.18106 23.1774 11.6636 24.0812 16.0376C24.985 20.4117 24.7157 21.7515 24.7157 23.6663\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M19.8179 14.1172C20.7092 15.2186 21.4884 16.1218 22.0259 16.7246C21.6491 17.3499 20.9438 17.7626 20.6343 17.8857C20.1174 18.0914 18.8796 18.1196 18.189 17.3623C17.4985 16.6051 17.621 15.4283 18.7378 14.5742C19.0251 14.3569 19.4085 14.1922 19.8179 14.1172Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"20.0111\" cy=\"15.8498\" rx=\"0.500968\" ry=\"0.451669\" transform=\"rotate(-14.9815 20.0111 15.8498)\" fill=\"black\"/>\n<path d=\"M24.0737 16.0591C25.2464 16.6199 27.7999 17.8997 28.93 18.4695L24.7931 22.0229\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag5_filter0_d_699_30577\" x=\"0\" y=\"0\" width=\"34.9668\" height=\"36.1357\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30577\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30577\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"35\" height=\"37\" viewBox=\"0 0 35 37\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#fishTag6_filter0_d_699_30609)\">\n<path d=\"M28.4832 0.200195C31.7969 0.200195 34.4832 2.88649 34.4832 6.2002V29.3682C34.4829 32.6816 31.7967 35.3682 28.4832 35.3682H6.19995C2.88631 35.3681 0.199951 32.6808 0.199951 29.3672V6.2002C0.199951 2.88654 2.88631 0.200274 6.19995 0.200195H28.4832ZM16.9988 2.12012C16.2341 2.12012 15.6141 2.74019 15.614 3.50488C15.614 4.26963 16.234 4.88965 16.9988 4.88965C17.7635 4.88956 18.3835 4.26958 18.3835 3.50488C18.3835 2.74025 17.7634 2.1202 16.9988 2.12012Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M28.0416 18.9394C26.9166 18.4313 24.3745 17.2901 23.207 16.79L23.471 19.1637L23.9232 22.1081L28.0416 18.9394Z\" fill=\"#FCDD43\"/>\n<path d=\"M29.582 19.0078C29.582 19.49 29.1911 19.8808 28.709 19.8808C28.2269 19.8808 27.836 19.49 27.836 19.0078C27.836 18.5257 28.2269 18.1348 28.709 18.1348C29.1911 18.1348 29.582 18.5257 29.582 19.0078Z\" fill=\"#FF00F6\" stroke-width=\"0.481583\" stroke=\"black\"/>\n<path d=\"M25.5148 20.1217C25.5148 20.4527 25.2465 20.721 24.9155 20.721C24.5845 20.721 24.3162 20.4527 24.3162 20.1217C24.3162 19.7907 24.5845 19.5224 24.9155 19.5224C25.2465 19.5224 25.5148 19.7907 25.5148 20.1217Z\" fill=\"#FF2323\"/>\n<circle cx=\"26.4817\" cy=\"19.4534\" r=\"0.668271\" fill=\"#41C681\"/>\n<circle cx=\"24.256\" cy=\"18.5531\" r=\"0.659046\" fill=\"#4FCBF9\"/>\n<path d=\"M11.2449 12.4301C9.41005 15.2571 8.85284 19.3772 9.02885 24.3483L9.14832 25.9559C11.79 26.5361 18.5829 27.332 23.781 25.5454C23.9034 24.5386 23.9034 24.1003 23.9034 23.846C23.9034 22.0468 24.1565 20.788 23.3072 16.6781C22.458 12.5682 17.8042 8.35639 15.5058 8.12158L14.046 14.6983C13.0729 14.1614 12.0998 13.2554 11.2449 12.4301Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M9.02885 24.3483C8.85284 19.3772 9.41005 15.2571 11.2449 12.4301C12.0998 13.2554 13.0729 14.1614 14.046 14.6983L15.5058 8.12158C17.8042 8.35639 22.458 12.5682 23.3072 16.6781C24.1565 20.788 23.9034 22.0468 23.9034 23.846\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M17.7707 17.9236C17.1219 17.2121 17.2372 16.1065 18.2868 15.304C19.1278 14.668 20.8406 14.51 21.4634 15.8923C22.0862 17.2746 20.5537 18.2221 20.068 18.4153C19.5823 18.6085 18.4196 18.6351 17.7707 17.9236Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"19.4826\" cy=\"16.5017\" rx=\"0.470712\" ry=\"0.424391\" transform=\"rotate(-14.9815 19.4826 16.5017)\" fill=\"black\"/>\n<path d=\"M23.375 16.7534C24.4551 17.2699 26.807 18.4487 27.8478 18.9735L24.0376 22.2463\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M17.2459 7.6127C17.2459 8.31998 16.6725 8.89335 15.9652 8.89335C15.2579 8.89335 14.6846 8.31998 14.6846 7.6127C14.6846 6.90541 15.2579 6.33204 15.9652 6.33204C16.6725 6.33204 17.2459 6.90541 17.2459 7.6127Z\" fill=\"#FF0E0E\" stroke-width=\"0.349623\" stroke=\"black\"/>\n<circle cx=\"15.7284\" cy=\"19.9796\" r=\"0.970313\" fill=\"#FF0000\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag6_filter0_d_699_30609\" x=\"0\" y=\"0\" width=\"34.9668\" height=\"36.1357\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30609\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30609\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"40\" height=\"39\" viewBox=\"0 0 40 39\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#fishTag7_filter0_d_699_30529)\">\n<path d=\"M15.6794 1.67969C17.8168 -0.292385 21.1105 -0.292384 23.2478 1.67969L28.5769 6.59668C28.8737 6.87043 29.2023 7.10902 29.5544 7.30664L35.8767 10.8555C38.4124 12.2789 39.4305 15.4108 38.2156 18.0527L35.1863 24.6406C35.0176 25.0075 34.8924 25.3931 34.8132 25.7891L33.3914 32.8994C32.8213 35.7508 30.1572 37.6864 27.2693 37.3477L20.0681 36.5029C19.6669 36.4558 19.2604 36.4558 18.8591 36.5029L11.658 37.3477C8.76991 37.6866 6.10605 35.7508 5.53589 32.8994L4.11401 25.7891C4.03485 25.3932 3.9096 25.0074 3.74097 24.6406L0.71167 18.0527C-0.503367 15.4106 0.514528 12.2788 3.05054 10.8555L9.3728 7.30664C9.72503 7.10895 10.0535 6.87055 10.3503 6.59668L15.6794 1.67969ZM19.4636 3.70215C18.699 3.70215 18.0791 4.32233 18.0789 5.08691C18.0789 5.85167 18.6989 6.47168 19.4636 6.47168C20.2282 6.47143 20.8474 5.85151 20.8474 5.08691C20.8472 4.32248 20.228 3.7024 19.4636 3.70215Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M13.7457 13.0162C11.7622 16.072 11.1599 20.5258 11.3502 25.8993L11.4793 27.6371C14.3349 28.2642 21.6777 29.1246 27.2967 27.1933C27.429 26.105 27.429 25.6312 27.429 25.3564C27.429 23.4115 27.7025 22.0507 26.7845 17.6081C25.8665 13.1655 20.836 8.61271 18.3515 8.35889L16.7735 15.4681C15.7216 14.8877 14.6698 13.9084 13.7457 13.0162Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M13.7457 13.0162C11.7622 16.072 11.1599 20.5258 11.3502 25.8993L11.4793 27.6371C14.3349 28.2642 21.6777 29.1246 27.2967 27.1933C27.429 26.105 27.429 25.6312 27.429 25.3564C27.429 23.4115 27.7025 22.0507 26.7845 17.6081C25.8665 13.1655 20.836 8.61271 18.3515 8.35889L16.7735 15.4681C15.7216 14.8877 14.6698 13.9084 13.7457 13.0162Z\" fill=\"#FFBD2D\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M31.7094 20.0781C30.5616 19.4993 27.9681 18.1995 26.777 17.6299L26.467 19.9072L27.5076 23.6872L31.7094 20.0781Z\" fill=\"#FFBD2D\"/>\n<path d=\"M11.3502 25.8993C11.1599 20.5258 11.7622 16.072 13.7457 13.0162C14.6698 13.9084 15.7216 14.8877 16.7735 15.4681L18.3515 8.35889C20.836 8.61271 25.8665 13.1655 26.7845 17.6081C27.7025 22.0507 27.429 23.4115 27.429 25.3564\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M20.7999 18.954C20.0985 18.1849 20.2231 16.9898 21.3577 16.1223C22.2669 15.4348 24.1183 15.264 24.7915 16.7582C25.4647 18.2525 23.8082 19.2767 23.2831 19.4855C22.7581 19.6943 21.5013 19.7231 20.7999 18.954Z\" fill=\"#38C15A\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"22.6504\" cy=\"17.4176\" rx=\"0.50882\" ry=\"0.458749\" transform=\"rotate(-14.9815 22.6504 17.4176)\" fill=\"black\"/>\n<path d=\"M26.7771 17.6299C27.9682 18.1995 30.5617 19.4993 31.7095 20.0781L27.5078 23.6872\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag7_filter0_d_699_30529\" x=\"0\" y=\"0\" width=\"39.2102\" height=\"38.1528\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30529\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30529\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"40\" height=\"39\" viewBox=\"0 0 40 39\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n<g filter=\"url(#fishTag8_filter0_d_699_30552)\">\n<path d=\"M15.6785 1.67871C17.8158 -0.293307 21.1095 -0.293197 23.2468 1.67871L28.5759 6.5957C28.8728 6.86955 29.2013 7.10798 29.5535 7.30566L35.8757 10.8545C38.4117 12.2778 39.4296 15.4096 38.2146 18.0518L35.1853 24.6396C35.0166 25.0066 34.8915 25.3921 34.8123 25.7881L33.3904 32.8984C32.8204 35.7501 30.1565 37.6857 27.2683 37.3467L20.0671 36.502C19.6658 36.4549 19.2594 36.4548 18.8582 36.502L11.657 37.3467C8.76885 37.6856 6.10488 35.75 5.53491 32.8984L4.11304 25.7881C4.03384 25.3921 3.9087 25.0065 3.73999 24.6396L0.710693 18.0518C-0.504192 15.4097 0.513679 12.2778 3.04956 10.8545L9.37183 7.30566C9.72408 7.10797 10.0525 6.86959 10.3494 6.5957L15.6785 1.67871ZM19.4626 3.70215C18.6979 3.7022 18.0779 4.32219 18.0779 5.08691C18.0779 5.8516 18.698 6.47163 19.4626 6.47168C20.2274 6.47168 20.8474 5.85163 20.8474 5.08691C20.8474 4.32216 20.2274 3.70215 19.4626 3.70215Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M13.7452 13.0157C11.7618 16.0716 11.1594 20.5253 11.3497 25.8988L11.4788 27.6366C14.3344 28.2638 21.6772 29.1241 27.2962 27.1928C27.4285 26.1045 27.4285 25.6307 27.4285 25.3559C27.4285 23.411 27.702 22.0503 26.784 17.6076C25.866 13.165 20.8355 8.61222 18.351 8.3584L16.773 15.4676C15.7212 14.8872 14.6693 13.9079 13.7452 13.0157Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<use xlink:href=\"#fishTag8_stroke0_699_30552\" fill=\"#4BCD74\"/>\n<mask id=\"fishTag8_stroke1_699_30552\" maskUnits=\"userSpaceOnUse\" x=\"25.4068\" y=\"19.6287\" width=\"8.11056\" height=\"7.34466\" fill=\"black\">\n<rect fill=\"white\" x=\"25.4068\" y=\"19.6287\" width=\"8.11056\" height=\"7.34466\"/>\n<use xlink:href=\"#fishTag8_stroke0_699_30552\"/>\n</mask>\n<path d=\"M26.8668 21.8163C28.656 21.5251 30.3229 22.752 30.742 23.3009C31.2257 23.2199 31.6923 23.5324 31.7972 24.0168C31.9048 24.5155 31.5882 25.007 31.0896 25.1151C30.5908 25.223 30.0985 24.9065 29.9903 24.4077C29.9455 24.2006 29.974 23.9943 30.0582 23.8165C28.9792 23.4674 27.5077 22.6901 27.1175 22.9751C26.6741 23.2994 26.7656 22.3378 26.8668 21.8163Z\" stroke-width=\"0.8\" stroke=\"black\" mask=\"url(#fishTag8_stroke1_699_30552)\"/>\n<path d=\"M13.7452 13.0157C11.7618 16.0716 11.1594 20.5253 11.3497 25.8988L11.4788 27.6366C14.3344 28.2638 21.6772 29.1241 27.2962 27.1928C27.4285 26.1045 27.4285 25.6307 27.4285 25.3559C27.4285 23.411 27.702 22.0503 26.784 17.6076C25.866 13.165 20.8355 8.61222 18.351 8.3584L16.773 15.4676C15.7212 14.8872 14.6693 13.9079 13.7452 13.0157Z\" fill=\"#4BCD74\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M11.3497 25.8988C11.1594 20.5253 11.7618 16.0716 13.7452 13.0157C14.6693 13.9079 15.7212 14.8872 16.773 15.4676L18.351 8.3584C20.8355 8.61222 25.866 13.165 26.784 17.6076C27.702 22.0503 27.4285 23.411 27.4285 25.3559\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M20.7994 18.9535C20.098 18.1844 20.2227 16.9893 21.3572 16.1218C22.2664 15.4343 24.1178 15.2635 24.791 16.7577C25.4642 18.252 23.8077 19.2762 23.2826 19.485C22.7576 19.6939 21.5008 19.7226 20.7994 18.9535Z\" fill=\"black\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"22.6502\" cy=\"17.4171\" rx=\"0.50882\" ry=\"0.458749\" transform=\"rotate(-14.9815 22.6502 17.4171)\" fill=\"white\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag8_filter0_d_699_30552\" x=\"0\" y=\"0\" width=\"39.21\" height=\"38.1533\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30552\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30552\" result=\"shape\"/>\n</filter>\n<path id=\"fishTag8_stroke0_699_30552\" d=\"M26.8668 21.8163C28.656 21.5251 30.3229 22.752 30.742 23.3009C31.2257 23.2199 31.6923 23.5324 31.7972 24.0168C31.9048 24.5155 31.5882 25.007 31.0896 25.1151C30.5908 25.223 30.0985 24.9065 29.9903 24.4077C29.9455 24.2006 29.974 23.9943 30.0582 23.8165C28.9792 23.4674 27.5077 22.6901 27.1175 22.9751C26.6741 23.2994 26.7656 22.3378 26.8668 21.8163Z\"/>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"39\" height=\"38\" viewBox=\"0 0 39 38\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#fishTag9_filter0_d_699_30470)\">\n<path d=\"M14.9578 1.9082C17.1526 -0.369865 20.8001 -0.369864 22.9949 1.9082L24.571 3.54395C25.4313 4.4369 26.5836 4.9916 27.8181 5.10742L30.0798 5.31934C33.2294 5.61485 35.5041 8.46721 35.0916 11.6035L34.7947 13.8555C34.6329 15.0847 34.9174 16.3318 35.5964 17.3691L36.8406 19.2695C38.5733 21.9162 37.7617 25.4725 35.0525 27.1055L33.1062 28.2783C32.0445 28.9182 31.2478 29.9182 30.8601 31.0957L30.1492 33.2539C29.1601 36.2587 25.8738 37.8415 22.908 36.7412L20.7781 35.9512C19.6156 35.5199 18.337 35.5199 17.1746 35.9512L15.0447 36.7412C12.0788 37.8415 8.79257 36.2587 7.80347 33.2539L7.09253 31.0957C6.70487 29.9182 5.90814 28.9182 4.84644 28.2783L2.90015 27.1055C0.190913 25.4725 -0.620631 21.9162 1.11206 19.2695L2.3562 17.3691C3.03521 16.3318 3.31973 15.0847 3.15796 13.8555L2.86108 11.6035C2.44858 8.46722 4.72327 5.61485 7.8728 5.31934L10.1345 5.10742C11.369 4.9916 12.5213 4.4369 13.3816 3.54395L14.9578 1.9082ZM18.9763 3.26758C18.2118 3.26765 17.5918 3.88688 17.5916 4.65137C17.5916 5.41608 18.2116 6.03606 18.9763 6.03613C19.7411 6.03613 20.3611 5.41612 20.3611 4.65137C20.3608 3.88684 19.7409 3.26758 18.9763 3.26758Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M13.2589 12.5811C11.2754 15.637 10.6731 20.0907 10.8634 25.4642L10.9925 27.202C13.8481 27.8292 21.1909 28.6895 26.8099 26.7583C26.9422 25.6699 26.9422 25.1962 26.9422 24.9213C26.9422 22.9765 27.2157 21.6157 26.2977 17.1731C25.3797 12.7304 20.3491 8.17765 17.8647 7.92383L16.2867 15.033C15.2348 14.4527 14.1829 13.4733 13.2589 12.5811Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M15.9116 8.01221L17.8039 8.67882L17.6313 9.73261L15.6746 9.367L15.9116 8.01221Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M15.4034 10.2809L17.4077 10.3706L17.5478 11.4292L15.5691 11.6463L15.4034 10.2809Z\" fill=\"white\" stroke-width=\"0.4\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M13.2586 12.6695C11.2752 15.7254 10.6729 20.1791 10.8631 25.5526L10.9923 27.2904C13.8479 27.9176 21.1906 28.7779 26.8097 26.8466C26.9419 25.7583 26.9419 25.2845 26.9419 25.0097C26.9419 23.0648 27.2155 21.7041 26.2975 17.2614C25.3795 12.8188 20.3489 8.26603 17.8644 8.01221L16.2865 15.1214C15.2346 14.541 14.1827 13.5617 13.2586 12.6695Z\" fill=\"#FEF455\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"14.1321\" cy=\"23.9339\" rx=\"1.36174\" ry=\"1.96695\" transform=\"rotate(28.9199 14.1321 23.9339)\" fill=\"#C2C104\"/>\n<circle cx=\"20.2954\" cy=\"18.0407\" r=\"1.2585\" fill=\"#C2C104\"/>\n<circle cx=\"22.812\" cy=\"22.7565\" r=\"1.2585\" fill=\"#C2C104\"/>\n<ellipse cx=\"17.9143\" cy=\"26.2718\" rx=\"1.2585\" ry=\"0.818196\" transform=\"rotate(-31.4145 17.9143 26.2718)\" fill=\"#C2C104\"/>\n<path d=\"M31.2226 19.7314C30.0748 19.1527 27.4812 17.8528 26.2902 17.2832L25.9802 19.5605L27.0208 23.3405L31.2226 19.7314Z\" fill=\"#FEF455\"/>\n<path d=\"M10.8631 25.5526C10.6729 20.1791 11.2752 15.7254 13.2586 12.6695C14.1827 13.5617 15.2346 14.541 16.2865 15.1214L17.8644 8.01221C20.3489 8.26603 25.3795 12.8188 26.2975 17.2614C27.2155 21.7041 26.9419 23.0648 26.9419 25.0097\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M20.3129 18.6068C19.6114 17.8377 19.7361 16.6426 20.8707 15.7752C21.7798 15.0876 23.6312 14.9169 24.3044 16.4111C24.9777 17.9053 23.3211 18.9295 22.7961 19.1383C22.2711 19.3472 21.0143 19.376 20.3129 18.6068Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"22.1636\" cy=\"17.0704\" rx=\"0.50882\" ry=\"0.458749\" transform=\"rotate(-14.9815 22.1636 17.0704)\" fill=\"black\"/>\n<path d=\"M26.2898 17.2832C27.4809 17.8528 30.0744 19.1527 31.2222 19.7314L27.0205 23.3405\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag9_filter0_d_699_30470\" x=\"0\" y=\"0\" width=\"38.2368\" height=\"37.8594\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30470\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30470\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>\n", "<svg class=\"tag-shape\" aria-hidden=\"true\" width=\"39\" height=\"38\" viewBox=\"0 0 39 38\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n<g filter=\"url(#fishTag10_filter0_d_699_30499)\">\n<path d=\"M14.9578 1.90918C17.1526 -0.3691 20.8 -0.369051 22.9949 1.90918L24.571 3.54492C25.4313 4.43783 26.5837 4.99253 27.8181 5.1084L30.0798 5.32031C33.2295 5.61584 35.5043 8.46806 35.0916 11.6045L34.7947 13.8564C34.6329 15.0857 34.9174 16.3328 35.5964 17.3701L36.8406 19.2705C38.5733 21.9172 37.7618 25.4735 35.0525 27.1064L33.1062 28.2793C32.0445 28.9193 31.2477 29.9192 30.8601 31.0967L30.1492 33.2549C29.16 36.2595 25.8738 37.8425 22.908 36.7422L20.7781 35.9521C19.6156 35.5209 18.337 35.5209 17.1746 35.9521L15.0447 36.7422C12.0789 37.8423 8.79255 36.2595 7.80347 33.2549L7.09253 31.0967C6.70491 29.9191 5.90823 28.9193 4.84644 28.2793L2.90015 27.1064C0.19096 25.4735 -0.620484 21.9171 1.11206 19.2705L2.3562 17.3701C3.03531 16.3327 3.31973 15.0857 3.15796 13.8564L2.86108 11.6045C2.44838 8.46814 4.72329 5.61597 7.8728 5.32031L10.1345 5.1084C11.369 4.99259 12.5213 4.43778 13.3816 3.54492L14.9578 1.90918ZM18.9763 3.26758C18.2118 3.26778 17.5916 3.88774 17.5916 4.65234C17.5916 5.41697 18.2117 6.03691 18.9763 6.03711C19.7411 6.03711 20.3611 5.4171 20.3611 4.65234C20.3611 3.88761 19.7411 3.26758 18.9763 3.26758Z\" fill=\"var(--tag-color)\" stroke-width=\"0.4\" stroke=\"black\"/><g class=\"tag-art\">\n<path d=\"M13.2591 12.5816C11.2757 15.6375 10.6734 20.0912 10.8636 25.4647L10.9928 27.2025C13.8483 27.8297 21.1911 28.69 26.8102 26.7588C26.9424 25.6704 26.9424 25.1966 26.9424 24.9218C26.9424 22.977 27.216 21.6162 26.298 17.1735C25.38 12.7309 20.3494 8.17814 17.8649 7.92432L16.2869 15.0335C15.2351 14.4532 14.1832 13.4738 13.2591 12.5816Z\" fill=\"#C5C5C5\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<use xlink:href=\"#fishTag10_stroke0_699_30499\" fill=\"#C5C5C5\"/>\n<use xlink:href=\"#fishTag10_stroke0_699_30499\" fill=\"url(#fishTag10_paint0_linear_699_30499)\"/>\n<use xlink:href=\"#fishTag10_stroke0_699_30499\" fill=\"#96FF6F\"/>\n<use xlink:href=\"#fishTag10_stroke0_699_30499\" fill=\"url(#fishTag10_paint1_linear_699_30499)\"/>\n<use xlink:href=\"#fishTag10_stroke1_699_30499\" fill=\"#C5C5C5\"/>\n<use xlink:href=\"#fishTag10_stroke1_699_30499\" fill=\"url(#fishTag10_paint2_linear_699_30499)\"/>\n<path d=\"M10.8631 25.5707C10.6729 20.1972 11.2752 15.7434 13.2586 12.6876C14.1827 13.5798 15.2346 14.5591 16.2865 15.1395L17.8644 8.03027C20.3489 8.28409 25.3795 12.8369 26.2975 17.2795C27.2155 21.7221 26.9419 23.0829 26.9419 25.0277C26.9419 25.3026 26.9419 25.7764 26.8097 26.8647C21.1906 28.796 13.8479 27.9356 10.9923 27.3084L10.8631 25.5707Z\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M10.8631 25.5707C10.6729 20.1972 11.2752 15.7434 13.2586 12.6876C14.1827 13.5798 15.2346 14.5591 16.2865 15.1395L17.8644 8.03027C20.3489 8.28409 25.3795 12.8369 26.2975 17.2795C27.2155 21.7221 26.9419 23.0829 26.9419 25.0277\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<path d=\"M20.3129 18.6254C19.6114 17.8563 19.7361 16.6612 20.8707 15.7937C21.7798 15.1062 23.6312 14.9354 24.3044 16.4296C24.9777 17.9238 23.3211 18.9481 22.7961 19.1569C22.2711 19.3657 21.0143 19.3945 20.3129 18.6254Z\" fill=\"white\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n<ellipse cx=\"22.1633\" cy=\"17.089\" rx=\"0.50882\" ry=\"0.458749\" transform=\"rotate(-14.9815 22.1633 17.089)\" fill=\"black\"/>\n<path d=\"M26.29 17.3013C27.4811 17.8709 30.0746 19.1707 31.2225 19.7495L27.0207 23.3586\" stroke-width=\"0.386236\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"black\"/>\n</g></g>\n<defs>\n<filter id=\"fishTag10_filter0_d_699_30499\" x=\"0\" y=\"0\" width=\"38.2368\" height=\"37.8594\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dx=\"0.283689\" dy=\"0.567377\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_699_30499\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_699_30499\" result=\"shape\"/>\n</filter>\n<linearGradient id=\"fishTag10_paint0_linear_699_30499\" x1=\"24.8987\" y1=\"26.2717\" x2=\"30.6074\" y2=\"17.4746\" gradientUnits=\"userSpaceOnUse\">\n<stop offset=\"0.308328\" stop-color=\"#CD93FF\"/>\n<stop offset=\"1\" stop-color=\"#93EDFF\"/>\n</linearGradient>\n<linearGradient id=\"fishTag10_paint1_linear_699_30499\" x1=\"28.6014\" y1=\"17.3013\" x2=\"28.6014\" y2=\"23.3586\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#96FF6F\"/>\n<stop offset=\"1\" stop-color=\"#7FFFD9\"/>\n</linearGradient>\n<linearGradient id=\"fishTag10_paint2_linear_699_30499\" x1=\"28.0652\" y1=\"40.1106\" x2=\"15.8506\" y2=\"1.7527\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#FF75C3\"/>\n<stop offset=\"0.2\" stop-color=\"#FFA647\"/>\n<stop offset=\"0.4\" stop-color=\"#FFE83F\"/>\n<stop offset=\"0.6\" stop-color=\"#9FFF5B\"/>\n<stop offset=\"0.8\" stop-color=\"#70E2FF\"/>\n<stop offset=\"1\" stop-color=\"#CD93FF\"/>\n</linearGradient>\n<path id=\"fishTag10_stroke0_699_30499\" d=\"M31.2226 19.7495C30.0748 19.1707 27.4812 17.8709 26.2902 17.3013L25.9802 19.5786L27.0208 23.3586L31.2226 19.7495Z\"/>\n<path id=\"fishTag10_stroke1_699_30499\" d=\"M13.2586 12.6876C11.2752 15.7434 10.6729 20.1972 10.8631 25.5707L10.9923 27.3084C13.8479 27.9356 21.1906 28.796 26.8097 26.8647C26.9419 25.7764 26.9419 25.3026 26.9419 25.0277C26.9419 23.0829 27.2155 21.7221 26.2975 17.2795C25.3795 12.8369 20.3489 8.28409 17.8644 8.03027L16.2865 15.1395C15.2346 14.5591 14.1827 13.5798 13.2586 12.6876Z\"/>\n</defs>\n</svg>\n"];
$('buildings').innerHTML=BUILDINGS.map((b,i)=>`<div class="building" data-building="${i}" role="group"><button class="recruit-hit" aria-label="招募${b.name}"></button><button class="fish-upgrade" data-fish-upgrade="${i}" aria-label="升级${b.name}" hidden><span class="fish-level">Lv.1</span><svg viewBox="0 0 32 36" aria-hidden="true"><path d="M16 2L30 17H22V33H10V17H2Z" fill="currentColor" stroke="#000" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg></button><span class="tile"><span class="tag-motion">${FISH_TAGS[i]}<span class="gain"></span></span><span class="owned"></span></span><span class="cost"><svg class="price-outline" viewBox="0 0 160 54" preserveAspectRatio="none" aria-hidden="true"><path d="M1 2H70Q80 14 90 2H159V51H90Q80 39 70 51H1Z" fill="#fffef0" stroke="#000" stroke-width="2"/></svg><img src="img/svg/apple2.svg" alt="苹果" draggable="false"><span></span></span></div>`).join('');
// Reference base Golden Cookie timing: 30 trials/sec, hazard ((t-300)/600)^5.
// This demo restricts outcomes to Lucky and Frenzy; Frenzy duration is customized to 60s.
function freshEvents(){return {elapsed:0,carry:0,active:null,lastKind:null,frenzy:0,frenzyDuration:60}}
// Original event mix was 50/50: weights 10 and 4 with total frequency ×7
// give Lucky ×10 and Golden ×4 relative to their original individual rates.
const RANDOM_APPLE_FREQUENCY=7;
function freshGuaranteedGold(){return [60,240].map(min=>({at:min+Math.random()*60,spawned:false,active:null}))}
function updateGuaranteedGold(dt){
 for(const gift of state.guaranteedGold){
  if(gift.active){gift.active.remaining=Math.max(0,gift.active.remaining-dt);if(gift.active.remaining<=1e-8)gift.active=null}
  if(!gift.spawned&&state.playSeconds>=gift.at){
   gift.spawned=true;
   const normal=state.events.active,x=normal&&normal.x<.5?.75:.18;
   gift.active={kind:'golden',x,y:.34+Math.random()*.08,remaining:13};
   save();
  }
 }
}
function chooseEventKind(){return Math.random()<10/14?'lucky':'golden'}
function spawnSpecial(kind=chooseEventKind()){
 const e=state.events;let x,y;
 for(let i=0;i<30;i++){x=.10+Math.random()*.79;y=.24+Math.random()*.32;if(!(x<.30&&y>.38)&&!(x>.73&&y>.49)&&!(x>.66&&y<.36))break}
 e.active={kind,x,y,remaining:13};e.elapsed=0;e.carry=0;save();render();return e.active;
}
function updateEvents(dt){
 updateGuaranteedGold(dt);
 const e=state.events;e.frenzy=Math.max(0,e.frenzy-dt);if(e.frenzy<1e-8)e.frenzy=0;
 if(e.active){e.active.remaining=Math.max(0,e.active.remaining-dt);if(e.active.remaining<1e-8){e.active=null;e.elapsed=0;e.carry=0}return}
 e.carry+=dt;
 while(e.carry+1e-9>=1/30){e.carry=Math.max(0,e.carry-1/30);e.elapsed+=1/30;
  const min=300/RANDOM_APPLE_FREQUENCY,max=900/RANDOM_APPLE_FREQUENCY;
  if(e.elapsed>=max||(e.elapsed>min&&Math.random()<((e.elapsed-min)/(max-min))**5)){spawnSpecial();break}
 }
}
function specialBurst(kind,amount,x,y){
 const rect=document.querySelector('.phone').getBoundingClientRect(),px=rect.left+x*rect.width,py=rect.top+y*rect.height;
 const label=document.createElement('div');label.className='special-reward';label.dataset.kind=kind;label.textContent=kind==='lucky'?'幸运！ +'+number(amount)+' 苹果':'黄金狂热！ 产量 ×7';label.style.left=px+'px';label.style.top=py+'px';$('fx').append(label);setTimeout(()=>label.remove(),1900);
 const ring=document.createElement('i');ring.className='special-ring';ring.style.left=px+'px';ring.style.top=py+'px';$('fx').append(ring);setTimeout(()=>ring.remove(),900);
 for(let i=0;i<26;i++){const part=document.createElement('img');part.className='special-spark';part.src=kind==='lucky'?'img/svg/apple-lucky.svg':'img/svg/apple-gold.svg?v=frenzy16';part.alt='';part.draggable=false;part.style.left=px+'px';part.style.top=py+'px';const angle=Math.PI*2*i/26;part.style.setProperty('--dx',Math.cos(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--dy',Math.sin(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--spin',Math.random()*360+'deg');$('fx').append(part);setTimeout(()=>part.remove(),1200)}
}
function collectSpecial(giftIndex=null){
 const e=state.events,gift=Number.isInteger(giftIndex)?state.guaranteedGold[giftIndex]:null,apple=gift?gift.active:e.active;if(!apple)return false;
 if(gift)gift.active=null;
 else {e.active=null;e.elapsed=0;e.carry=0;e.lastKind=apple.kind}
 state.goldenClicks++;let amount=0;
 if(apple.kind==='lucky'){amount=Math.min(state.apples*.15,cps()*900)+13;earn(amount)}else {e.frenzyDuration=60;e.frenzy=e.frenzyDuration;}
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
document.querySelector('.fish-character').addEventListener('load',()=>{sentGoldenDance=null;initializeCharacterWardrobe();syncGoldenDance(state.events.frenzy>0)});
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
  button.dataset.kind=active.kind;button.style.left=active.x*100+'%';button.style.top=active.y*100+'%';button.style.opacity=String(Math.min(1,active.remaining/1.2));button.setAttribute('aria-label',(active.kind==='lucky'?'幸运苹果，领取即时奖励':`金苹果，开启${60}秒七倍点击与自动产量`));
  const src=active.kind==='golden'?'img/svg/apple-gold.svg?v=frenzy16':'img/svg/apple-lucky.svg';if(button.querySelector('img').getAttribute('src')!==src)button.querySelector('img').src=src;
 }else $('specialApple')?.remove();
 state.guaranteedGold.forEach((gift,i)=>{
  let button=$('guaranteedGold'+i);const apple=gift.active;
  if(!apple){button?.remove();return}
  if(!button){button=document.createElement('button');button.id='guaranteedGold'+i;button.className='special-apple';button.innerHTML='<img draggable="false" alt="金苹果" src="img/svg/apple-gold.svg?v=frenzy16">';button.onclick=()=>collectSpecial(i);layer.append(button)}
  button.dataset.kind='golden';button.style.left=apple.x*100+'%';button.style.top=apple.y*100+'%';button.style.opacity=String(Math.min(1,apple.remaining/1.2));button.setAttribute('aria-label','金苹果，开启60秒七倍点击与自动产量');
 });
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

// DEMO: summon a worker fishman. It enters from off-stage right, walks left to a
// random spot in the open floor, waves, then keeps walking left off-screen
// without turning round. Up to WORKER_LIMIT at once; further clicks do nothing.
// Each one gets its own entry delay, pace and spot so a burst of clicks does not
// send out a single column of identical fishmen.
// Ordinary visitors share a cached sprite atlas.
const workers=[];
// WORKER_START puts the frame just far enough right that the fishman drawn
// inside it is off the phone's edge, so a click shows a step almost at once.
const WORKER_LIMIT=10,WORKER_START=92,WORKER_EXIT=-40,WORKER_LEAVE=-24,WORKER_MIN=34,WORKER_MAX=62,WORKER_GAP=7;
// Both rigs share the same ground baseline; positive depth is nearer the viewer.
const characterDepthLayer=depth=>3+Math.round((depth+2)*10);
document.querySelector('.fish-character').style.zIndex=String(characterDepthLayer(0));
function workerTarget(){
 // Reserve upcoming stops too, so a batch cannot all choose the same empty spot.
 // Departing visitors only occupy their current position, not their old stop.
 const occupied=workers.map(worker=>({
  x:worker.phase==='out'?worker.x:worker.target,depth:worker.depth
 })).filter(spot=>spot.x>=WORKER_MIN-WORKER_GAP&&spot.x<=WORKER_MAX+WORKER_GAP);
 let best=null,bestScore=-Infinity;
 // Sample the whole floor rather than falling back to a fully random position
 // when crowded. Depth separation lets nearby fish overlap without stacking.
 for(let column=0;column<15;column++)for(let row=0;row<5;row++){
  const x=WORKER_MIN+(column+Math.random())/15*(WORKER_MAX-WORKER_MIN);
  const depth=-2+(row+Math.random());
  let nearest=Infinity,crowding=0;
  for(const spot of occupied){
   const distance=((x-spot.x)/WORKER_GAP)**2+((depth-spot.depth)/2.5)**2;
   nearest=Math.min(nearest,distance);crowding+=Math.exp(-distance);
  }
  const score=occupied.length?nearest-.15*crowding:Math.random();
  if(score>bestScore){bestScore=score;best={x,depth}}
 }
 return best;
}
// All ordinary visitors share the same pre-rendered poses. The resident keeps
// its live deformation engine; visitors no longer need a full editor iframe each.
const workerAtlas=new Image();workerAtlas.src='img/worker-atlas.webp?v=floor73';
const suitAtlas=new Image();suitAtlas.src='img/worker-suit-atlas.webp?v=floor73';
const kingAtlas=new Image();kingAtlas.src='img/worker-king-atlas.webp?v=1';
const mutantAtlas=new Image();mutantAtlas.src='img/worker-mutant-atlas.webp?v=1';
const sharkAtlas=new Image();sharkAtlas.src='img/worker-shark-atlas.webp?v=look109';
const clownAtlas=new Image();clownAtlas.src='img/worker-clown-atlas.webp?v=look109';
const alienAtlas=new Image();alienAtlas.src='img/worker-alien-atlas.webp?v=look109';
const farmerAtlas=new Image();farmerAtlas.src='img/worker-farmer-atlas.webp?v=1';
let spareWorkerFrame=null;
function makeWorkerFrame(){
 const wrap=document.createElement('div');
 wrap.className='fish-worker';wrap.setAttribute('aria-hidden','true');
 const shadow=document.createElement('div');shadow.className='fish-worker-shadow';
 const canvas=document.createElement('canvas');canvas.className='worker-sprite';
 canvas.width=256;canvas.height=376;wrap.append(shadow,canvas);
 wrap.workerContext=canvas.getContext('2d');wrap.workerPose=-1;
 wrap.style.visibility='hidden';wrap.dataset.ready='1';
 document.querySelector('.phone').append(wrap);
 return wrap;
}
function prepareWorkerFrame(){
 if(!spareWorkerFrame)spareWorkerFrame=makeWorkerFrame();
}
function paintWorkerPose(wrap,index){
 const atlas=wrap.workerAtlas||workerAtlas;
 if(!atlas.complete||!atlas.naturalWidth||wrap.workerPose===index)return;
 const ctx=wrap.workerContext;ctx.clearRect(0,0,256,376);
 ctx.drawImage(atlas,(index%8)*256,Math.floor(index/8)*376,256,376,0,0,256,376);
 wrap.workerPose=index;
}
function positionWorker(wrap,x){
 // Percent transform is relative to the 40%-wide visitor, avoiding layout per step.
 wrap.style.transform=`translate3d(${x*2.5}%,0,0)`;
}
// Every building purchase sends that many ordinary fishmen on stage. Only WORKER_LIMIT fit at once,
// so the rest wait here and walk on as earlier ones leave.
let workerQueue=[];
function queueWorkers(count,gain=0,building=null){for(let i=0;i<count;i++)workerQueue.push({gain,building});if(gain>0)rateDeferred+=gain*count}
// Reprice recruits still waiting or walking when permanent production changes.
// Labels already in flight finish with the amount displayed when they departed.
function syncRecruitGains(){
 for(const recruit of [...workerQueue,...workers]){
  if(!Number.isInteger(recruit.building)||recruit.gain<=0)continue;
  const latest=unitCps(recruit.building);
  rateDeferred+=latest-recruit.gain;recruit.gain=latest;
 }
}
// Stagger arrivals for readability; excess recruits remain queued.
let workerReleaseWait=0;
function drainWorkerQueue(dt){
 workerReleaseWait-=dt;
 if(!workerQueue.length||workerReleaseWait>0||workers.length>=WORKER_LIMIT)return;
 if(summonWorker(workerQueue[0].gain,workerQueue[0].building)){workerQueue.shift();workerReleaseWait=.7}
}
function summonWorker(gain=0,building=null){
 if(!Number.isFinite(gain))gain=0;
 const look=BUILDINGS[building]?.workerLook||'ordinary';
 const atlas=({'shark-suit':sharkAtlas,'clown-suit':clownAtlas,alien:alienAtlas,'ivory-king':kingAtlas,'navy-suit':suitAtlas,'milk-frog':mutantAtlas,farmer:farmerAtlas})[look]||workerAtlas;
 if(!atlas.complete||!atlas.naturalWidth||workers.length>=WORKER_LIMIT)return false;
 const frame=workerPool.pop()||spareWorkerFrame||makeWorkerFrame();
 if(frame===spareWorkerFrame)spareWorkerFrame=null;
 frame.workerAtlas=atlas;frame.workerPose=-1;frame.dataset.look=look;
 frame.style.visibility='visible';
 const waiting=workers.filter(worker=>worker.phase==='wait'||worker.phase==='in').length;
 const stop=workerTarget(),depth=stop.depth;
 const entry={frame,depth,gain,building,x:WORKER_START,target:stop.x,phase:'wait',clock:0,
  // The first one off the mark leaves at once; the queue's own release gap
  // spaces the rest out, so each only needs a small random extra.
  delay:waiting?Math.random()*.3:0,
  speed:23+Math.random()*8,hold:.2+Math.random()*.7};
 positionWorker(frame,WORKER_START);paintWorkerPose(frame,0);
 // A little depth offset so two fishmen standing near each other do not overlap
 // exactly. The lower one stands nearer the camera, so it is drawn in front.
 frame.style.setProperty('--worker-y',depth.toFixed(2)+'%');
 frame.style.zIndex=String(characterDepthLayer(depth));
 workers.push(entry);
 prepareWorkerFrame();
 return true;
}
// A recruit that has walked off stage sends its production up to the rate
// ticket; the number only starts climbing once the label lands there.
let rateDeferred=0,rateRoll=0,rateRollSpeed=0,rateFlights=0;
function flyRateGain(gain,depth,workerX=-10){
 const phone=document.querySelector('.phone'),rateEl=document.querySelector('.rate');
 if(!phone||!rateEl){rateDeferred=Math.max(0,rateDeferred-gain);return}
 const box=phone.getBoundingClientRect(),target=rateEl.getBoundingClientRect();
 const tag=document.createElement('div');
 tag.className='rate-gain';tag.setAttribute('aria-hidden','true');
 tag.innerHTML='<img src="img/svg/apple.svg" alt=""><span>+'+productionNumber(gain*(state.events.frenzy>0?7:1))+'/s</span>';
 phone.append(tag);rateFlights++;
 // Start on the fishman's own body, which by now is just off the left edge,
 // so the label drifts in from off-screen rather than popping at the border.
 const startX=box.width*(workerX+20)/100,startY=box.height*(.39+(depth+12)/100);
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
 if(rateRoll<=1e-6){rateRoll=0;if(!rateFlights&&!workers.some(g=>g.gain>0)&&!workerQueue.some(g=>g.gain>0))rateDeferred=0}
}
// The ticket shows everything that has already arrived.
function shownRate(){return Math.max(0,baseCps()-rateDeferred)}
// Reuse the small canvas wrappers instead of allocating them for every purchase.
const workerPool=[];
function retireWorkerFrame(wrap){
 wrap.style.visibility='hidden';
 positionWorker(wrap,WORKER_START);
 if(workerPool.length<WORKER_LIMIT)workerPool.push(wrap);else wrap.remove();
}
function driveWorkers(dt){
 drainWorkerQueue(dt);
 for(let i=workers.length-1;i>=0;i--){
  const worker=workers[i];
  if(worker.phase==='wait'){
   worker.clock+=dt;if(worker.clock<worker.delay)continue;
   worker.phase='in';worker.clock=0;
  }else if(worker.phase==='in'){
   worker.x=Math.max(worker.target,worker.x-worker.speed*dt);
   if(worker.x<=worker.target){worker.phase='wave';worker.clock=0}
  }else if(worker.phase==='wave'){
   worker.clock+=dt;
   const span=1.5+worker.hold;
   if(worker.clock>=span){worker.phase='out';worker.clock=0}
  }else{
   worker.x-=worker.speed*dt;
   // The gain pops the moment the fishman clears the left edge, not when its
   // frame is finally retired further out.
   if(worker.gain>0&&worker.x<=WORKER_LEAVE){flyRateGain(worker.gain,worker.depth,worker.x);worker.gain=0}
   if(worker.x<=WORKER_EXIT){retireWorkerFrame(worker.frame);workers.splice(i,1);continue}
  }
  positionWorker(worker.frame,worker.x);
  const mode=worker.phase==='wave'?'wave':worker.phase==='in'||worker.phase==='out'?'walk':'idle';
  if(mode!==worker.poseMode){worker.poseMode=mode;worker.poseTime=0}
  else worker.poseTime+=dt;
  const index=mode==='walk'?1+Math.floor((worker.poseTime%.9)*30):mode==='wave'?28+Math.min(45,Math.floor(worker.poseTime*30)):0;
  paintWorkerPose(worker.frame,index);
 }
}
function addTestApples(){
 const limit=1e75;
 if(state.apples>=limit){notify('已达到测试苹果上限');return}
 const target=Math.min(limit,Math.max(1e6,state.apples*10));
 earn(target-state.apples);displayed=state.apples;lastPaintedBalance=null;
 save();render();notify('测试苹果已增加');
}
$('testApples').onclick=addTestApples;
function alignTestReset(){
 const top=$('testLucky').getBoundingClientRect().top;
 if(top>0)document.querySelector('.debug-reset').style.top=top+'px';
}
window.addEventListener('resize',alignTestReset);
new ResizeObserver(alignTestReset).observe(document.querySelector('.debug-events'));
requestAnimationFrame(alignTestReset);
$('testLucky').onclick=()=>spawnSpecial('lucky');$('testGolden').onclick=()=>spawnSpecial('golden');
// DEMO: one row per fishman, ×1 and ×10. These only play the arrival
// animation and the greeting - no apples are spent and no production changes.
$('spawnGrid').replaceChildren(...BUILDINGS.flatMap((b,i)=>[1,10].map(count=>{
 const button=document.createElement('button');
 button.textContent=count===1?b.name:'×10';
 button.setAttribute('aria-label',`${b.name} 进场 ${count} 个`);
 button.onclick=()=>{greetPurchase();queueWorkers(count,0,i)};
 return button;
})));
prepareWorkerFrame();
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
const clockText=total=>{const whole=Math.floor(Math.max(0,total));
 return [Math.floor(whole/3600),Math.floor(whole/60)%60,whole%60].map(n=>String(n).padStart(2,'0')).join(':')};
// Each factory level keeps the time it was reached, so a run can be compared
// with the last one without watching the clock.
function renderLevelTimes(){
 const list=$('levelTimes'),levels=Object.keys(state.levelTimes).map(Number).sort((a,b)=>a-b);
 list.hidden=!levels.length;
 const rows=levels.map(level=>`<span><i>Lv.${level}</i><b>${clockText(state.levelTimes[level])}</b></span>`).join('');
 if(list.innerHTML!==rows)list.innerHTML=rows;
}
function render(){
 const played=Math.floor(state.playSeconds),hours=Math.floor(played/3600),minutes=Math.floor(played/60)%60,seconds=played%60;
 setText($('playTime'),[hours,minutes,seconds].map(n=>String(n).padStart(2,'0')).join(':'));
 renderLevelTimes();
 if(typeof renderCatalog==="function")renderCatalog();
 renderEvents();
 paintBalance();$('rate').textContent='+'+precise(shownRate()*(state.events.frenzy>0?7:1))+'/s';$('rateMultiplier').hidden=true;$('clickValue').textContent='每次 +'+number(clickPower());document.querySelector('.phone').classList.toggle('running',cps()>0);
 document.querySelectorAll('[data-bulk]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.bulk===bulk)));
 let consecutiveLocked=0;
 document.querySelectorAll('[data-building]').forEach(el=>{
  const i=+el.dataset.building,b=BUILDINGS[i],show=visible(i),price=buildingCost(i),disabled=!show,poor=state.apples+1e-9<price;
  consecutiveLocked=show?0:consecutiveLocked+1;el.hidden=consecutiveLocked>2;
  if(el.disabled!==disabled)el.disabled=disabled;
  const recruit=el.querySelector('.recruit-hit');recruit.disabled=disabled;
  const next=fishUpgrade(i),arrow=el.querySelector('.fish-upgrade');arrow.hidden=!show;arrow.querySelector('svg').toggleAttribute('hidden',!next);setText(arrow.querySelector('.fish-level'),'Lv.'+fishLevel(i));
  arrow.classList.toggle('can-upgrade',!!next&&state.apples+1e-9>=next.price);
  arrow.setAttribute('aria-label',next?`升级${b.name}：${next.name}，${number(next.price)}苹果`:`${b.name}暂无升级`);
  el.classList.toggle('affordable',show&&!poor);el.classList.toggle('locked',!show);
  // An empty corner reads as "none yet"; a zero would look like a real count.
  setText(el.querySelector('.owned'),show&&state.owned[i]>0?number(state.owned[i]):'');
  // Undiscovered buildings show the same figure as a grey silhouette instead of a question mark.
  el.querySelector('.cost img').hidden=!show;
  setText(el.querySelector('.cost span'),show?number(price):'???');
  setText(el.querySelector('.gain'),show?`+${productionNumber(currentUnitCps(i))}/s`:'???');
  const label=show?`招募 ${bulk} 个${b.name}，${price} 苹果${poor?'，苹果不够':''}`:'未解锁的鱼人';
  if(el.getAttribute('aria-label')!==label)el.setAttribute('aria-label',label);
 });
 if($('fishUpgradeDialog').open)renderFishUpgrade();
 renderFactoryUpgrade();
 const hasItems=offers().length>0;$('vendingDot').hidden=!hasItems;$('openShop').setAttribute('aria-label','外出，暂未开放');
 if($('shopDialog').open)renderVending();
}
// Hand-drawn art for the cheapest items; everything else still uses the
// placeholder until it is drawn.
const ITEM_ICONS={
 // Farmer and shark fishmen, drawn to match the earlier icon set.
 'supply-farmer-0':'img/items/item-supply-farmer-0.svg',
 'supply-farmer-1':'img/items/item-supply-farmer-1.svg',
 'supply-farmer-2':'img/items/item-supply-farmer-2.svg',
 'supply-farmer-3':'img/items/item-supply-farmer-3.svg',
 'supply-farmer-4':'img/items/item-supply-farmer-4.svg',
 'supply-farmer-5':'img/items/item-supply-farmer-5.svg',
 'supply-farmer-6':'img/items/item-supply-farmer-6.svg',
 'supply-farmer-7':'img/items/item-supply-farmer-7.svg',
 'supply-farmer-8':'img/items/item-supply-farmer-8.svg',
 'supply-farmer-9':'img/items/item-supply-farmer-9.svg',
 'supply-farmer-10':'img/items/item-supply-farmer-10.svg',
 'supply-farmer-11':'img/items/item-supply-farmer-11.svg',
 'supply-farmer-12':'img/items/item-supply-farmer-12.svg',
 'supply-farmer-13':'img/items/item-supply-farmer-13.svg',
 'supply-shark-0':'img/items/item-supply-shark-0.svg',
 'supply-shark-1':'img/items/item-supply-shark-1.svg',
 'supply-shark-2':'img/items/item-supply-shark-2.svg',
 'supply-shark-3':'img/items/item-supply-shark-3.svg',
 'supply-shark-4':'img/items/item-supply-shark-4.svg',
 'supply-shark-5':'img/items/item-supply-shark-5.svg',
 'supply-shark-6':'img/items/item-supply-shark-6.svg',
 'supply-shark-7':'img/items/item-supply-shark-7.svg',
 'supply-shark-8':'img/items/item-supply-shark-8.svg',
 'supply-shark-9':'img/items/item-supply-shark-9.svg',
 'supply-shark-10':'img/items/item-supply-shark-10.svg',
 'supply-shark-11':'img/items/item-supply-shark-11.svg',
 'supply-shark-12':'img/items/item-supply-shark-12.svg',
 'supply-shark-13':'img/items/item-supply-shark-13.svg',
 'tier-farmer-0':'img/items/item-farmer-straw-hat.svg',
 'tier-farmer-1':'img/items/item-farmer-hoe.svg',
 'tier-farmer-2':'img/items/item-farmer-seed-tray.svg',
 'tier-farmer-3':'img/items/item-farmer-drip-hose.svg',
 'tier-farmer-4':'img/items/item-farmer-compost.svg',
 'tier-farmer-5':'img/items/item-farmer-manual.svg',
 'tier-farmer-6':'img/items/item-farmer-rotation-cal.svg',
 'tier-farmer-7':'img/items/item-farmer-greenhouse.svg',
 'tier-farmer-8':'img/items/item-farmer-harvester.svg',
 'tier-farmer-9':'img/items/item-farmer-root-pod.svg',
 'tier-farmer-10':'img/items/item-farmer-four-season.svg',
 'tier-farmer-11':'img/items/item-farmer-cloud-net.svg',
 'tier-farmer-12':'img/items/item-farmer-time-seeder.svg',
 'tier-farmer-13':'img/items/item-farmer-infinite-soil.svg',
 'tier-farmer-14':'img/items/item-farmer-origin-orchard.svg',
 'tier-shark-0':'img/items/item-shark-whetstone.svg',
 'tier-shark-1':'img/items/item-shark-bite-basket.svg',
 'tier-shark-2':'img/items/item-shark-goggles.svg',
 'tier-shark-3':'img/items/item-shark-saw-picker.svg',
 'tier-shark-4':'img/items/item-shark-nose-radar.svg',
 'tier-shark-5':'img/items/item-shark-tail-fin.svg',
 'tier-shark-6':'img/items/item-shark-hunt-squad.svg',
 'tier-shark-7':'img/items/item-shark-current-harvest.svg',
 'tier-shark-8':'img/items/item-shark-tooth-cutter.svg',
 'tier-shark-9':'img/items/item-shark-stealth-pod.svg',
 'tier-shark-10':'img/items/item-shark-sonic-cruiser.svg',
 'tier-shark-11':'img/items/item-shark-star-fleet.svg',
 'tier-shark-12':'img/items/item-shark-time-tracker.svg',
 'tier-shark-13':'img/items/item-shark-infinite-hunt.svg',
 'tier-shark-14':'img/items/item-shark-abyss-king.svg',
 'mentor-shark':'img/items/item-mentor-shark.svg',
 'mentor-staff':'img/items/item-badge.svg',
 'finger':'img/items/item-finger.svg',
 'cream':'img/items/item-cream.svg',
 'tier-1-0':'img/items/item-badge.svg',
 'tier-1-1':'img/items/item-grip-glove.svg',
 'hands':'img/items/item-two-fins.svg',
 'tier-1-2':'img/items/item-lunch.svg',
 'mouse-0':'img/items/item-clicker.svg',
 'fingers-0':'img/items/item-all-hands.svg',
 'tier-3-0':'img/items/item-juggling.svg',
 'tier-3-1':'img/items/item-clown-nose.svg',
 'mentor-3':'img/items/item-mentor-clown.svg',
 'supply-plain-cookies':'img/items/item-bento.svg',
 'tier-4-0':'img/items/item-crown.svg',
 'supply-sugar-cookies':'img/items/item-apple-chips.svg',
 'tier-1-3':'img/items/item-double-pay.svg',
 'mouse-1':'img/items/item-clicker-steel.svg',
 'tier-3-2':'img/items/item-stripe-suit.svg',
 'tier-4-1':'img/items/item-cape.svg',
 'mentor-4':'img/items/item-mentor-king.svg',
 'supply-oatmeal-raisin-cookies':'img/items/item-juice.svg',
 'fingers-1':'img/items/item-all-hands-2.svg',
 'tier-5-0':'img/items/item-sponge.svg',
 'supply-peanut-butter-cookies':'img/items/item-grilled-skewer.svg',
 'tier-4-2':'img/items/item-royal-basket.svg',
 'tier-5-1':'img/items/item-nutrient-bucket.svg',
 'mentor-5':'img/items/item-mentor-sponge.svg',
 'supply-almond-cookies':'img/items/item-onigiri.svg',
 'supply-cashew-cookies':'img/items/item-breakfast.svg',
 'supply-coconut-cookies':'img/items/item-buns.svg',
 'supply-hazelnut-cookies':'img/items/item-orchard-box.svg',
 'supply-macadamia-nut-cookies':'img/items/item-hot-soup.svg',
 'supply-walnut-cookies':'img/items/item-fruit-cup.svg',
 'fingers-2':'img/items/item-all-hands-3.svg',
 'tier-6-0':'img/items/item-reagent.svg',
 'supply-milk-chocolate-cookies':'img/items/item-apple-pie.svg',
 'supply-white-chocolate-cookies':'img/items/item-share-pack.svg',
 'tier-1-4':'img/items/item-certificate.svg',
 'mouse-2':'img/items/item-clicker-titanium.svg',
 'tier-3-3':'img/items/item-unicycle.svg',
 'tier-5-2':'img/items/item-airy-sponge.svg',
 'gold-lucky-day':'img/items/item-seaweed-charm.svg',
 'tier-6-1':'img/items/item-fast-cell.svg',
 'mentor-6':'img/items/item-mentor-mutant.svg',
 'fingers-3':'img/items/item-all-hands-4.svg',
 'tier-7-0':'img/items/item-antenna.svg',
 'supply-double-chip-cookies':'img/items/item-kelp-meal.svg',
 'tier-4-3':'img/items/item-decree.svg',
 'supply-white-chocolate-macadamia-nut-cookies':'img/items/item-attendance-snack.svg',
 'tier-6-2':'img/items/item-tentacles.svg',
 'fingers-4':'img/items/item-all-hands-5.svg',
 'tier-7-1':'img/items/item-antigrav-glove.svg',
 'mentor-7':'img/items/item-mentor-alien.svg',
 'supply-all-chocolate-cookies':'img/items/item-coffee.svg',
 'tier-1-5':'img/items/item-training.svg',
 'mouse-3':'img/items/item-clicker-mythril.svg',
 'tier-3-4':'img/items/item-flower-hat.svg',
 'tier-5-3':'img/items/item-press.svg',
 'gold-serendipity':'img/items/item-fortune-slip.svg',
 'supply-dark-chocolate-coated-cookies':'img/items/item-apple-tea.svg',
 'supply-white-chocolate-coated-cookies':'img/items/item-fruit-platter.svg',
 'tier-7-2':'img/items/item-ufo-licence.svg',
 'supply-eclipse-cookies':'img/items/item-canteen-pie.svg',
 'tier-4-4':'img/items/item-royal-guard.svg',
 'tier-9-0':'img/items/item-prayer-bell.svg',
 'supply-zebra-cookies':'img/items/item-afternoon-tea.svg',
 'tier-6-3':'img/items/item-spores.svg',
 'tier-9-1':'img/items/item-altar.svg',
 'mentor-9':'img/items/item-mentor-god.svg',
 'supply-snickerdoodles':'img/items/item-jam-bun.svg',
 'mouse-4':'img/items/item-clicker-mystic.svg',
 'tier-3-5':'img/items/item-flying-fish.svg',
 'tier-5-4':'img/items/item-coral-filter.svg',
 'supply-stroopwafels':'img/items/item-cheese-roll.svg',
 'fingers-5':'img/items/item-all-hands-6.svg',
 'tier-7-3':'img/items/item-plasma-scythe.svg',
 'tier-9-2':'img/items/item-holy-branch.svg',
 'supply-macaroons':'img/items/item-snack-box.svg',
 'tier-1-6':'img/items/item-flex-shift.svg',
 'tier-4-5':'img/items/item-palace-orchard.svg',
 'gold-get-lucky':'img/items/item-golden-hourglass.svg',
 'supply-empire-biscuits':'img/items/item-celebration-tower.svg',
 'tier-6-4':'img/items/item-regeneration.svg',
 'supply-madeleines':'img/items/item-staff-meal.svg',
 'supply-palmiers':'img/items/item-friday-dessert.svg',
 'mouse-5':'img/items/item-clicker-phantom.svg',
 'tier-5-5':'img/items/item-deep-nutrient.svg',
 'supply-palets':'img/items/item-night-porridge.svg',
 'supply-sabl-eacute-s':'img/items/item-banquet-ticket.svg',
 'tier-7-4':'img/items/item-wormhole-basket.svg',
 'tier-9-3':'img/items/item-oracle-book.svg',
 'tier-3-6':'img/items/item-touring-troupe.svg',
 'supply-gingerbread-men':'img/items/item-harvest-feast.svg',
 'tier-6-5':'img/items/item-gene-upgrade.svg',
 'fingers-6':'img/items/item-all-hands-7.svg',
 'tier-1-7':'img/items/item-year-bonus.svg',
 'mouse-6':'img/items/item-clicker-wish.svg',
 'tier-4-6':'img/items/item-tribute.svg',
 'tier-7-5':'img/items/item-quantum-nursery.svg',
 'tier-9-4':'img/items/item-grail.svg',
 'tier-5-6':'img/items/item-giant-straw.svg',
 'mouse-7':'img/items/item-clicker-fantasy.svg',
 'tier-3-7':'img/items/item-applause.svg',
 'tier-6-6':'img/items/item-split-culture.svg',
 'fingers-7':'img/items/item-all-hands-8.svg',
 'tier-9-5':'img/items/item-tide-scepter.svg',
 'tier-1-8':'img/items/item-efficiency-manual.svg',
 'tier-4-7':'img/items/item-sea-rule.svg',
 'tier-7-6':'img/items/item-star-transport.svg',
 'mouse-8':'img/items/item-clicker-unbreakable.svg',
 'tier-5-7':'img/items/item-tide-pump.svg',
 'tier-3-8':'img/items/item-sea-show.svg',
 'tier-6-7':'img/items/item-hive-mind.svg',
 'fingers-8':'img/items/item-all-hands-9.svg',
 'tier-9-6':'img/items/item-dew.svg',
 'supply-fudge-squares':'img/items/item-rainbow-candy.svg',
 'tier-1-9':'img/items/item-expert-cert.svg',
 'mouse-9':'img/items/item-clicker-mithril.svg',
 'tier-4-8':'img/items/item-golden-throne.svg',
 'supply-shortbread-biscuits':'img/items/item-juggle-apples.svg',
 'tier-7-7':'img/items/item-warp-planting.svg',
 'supply-millionaires-shortbreads':'img/items/item-smile-muffin.svg',
 'tier-5-8':'img/items/item-current-loop.svg',
 'supply-caramel-cookies':'img/items/item-popcorn.svg',
 'supply-pecan-sandies':'img/items/item-cream-cup.svg',
 'mouse-10':'img/items/item-clicker-obsidian.svg',
 'tier-3-9':'img/items/item-masks.svg',
 'supply-moravian-spice-cookies':'img/items/item-spiral-roll.svg',
 'tier-6-8':'img/items/item-adaptation.svg',
 'fingers-9':'img/items/item-all-hands-10.svg',
 'tier-9-7':'img/items/item-divine-orchard.svg',
 'supply-anzac-biscuits':'img/items/item-unicycle-lunch.svg',
 'tier-4-9':'img/items/item-sea-palace.svg',
 'supply-buttercakes':'img/items/item-cheer-soda.svg',
 'tier-7-8':'img/items/item-gravity-control.svg',
 'supply-ice-cream-sandwiches':'img/items/item-tour-bucket.svg',
 'mouse-11':'img/items/item-clicker-plasma.svg',
 'tier-1-10':'img/items/item-remote-clone.svg',
 'tier-5-9':'img/items/item-irrigation.svg',
 'supply-pink-biscuits':'img/items/item-flying-fish-cookie.svg',
 'supply-whole-grain-cookies':'img/items/item-stage-candy.svg',
 'supply-candy-cookies':'img/items/item-circus-feast.svg',
 'tier-6-9':'img/items/item-super-cell.svg',
 'fingers-10':'img/items/item-all-hands-11.svg',
 'tier-9-8':'img/items/item-blessing.svg',
 'supply-big-chip-cookies':'img/items/item-ovation-pie.svg',
 'mouse-12':'img/items/item-clicker-miracle.svg',
 'tier-3-10':'img/items/item-gravity-juggle.svg',
 'supply-one-chip-cookies':'img/items/item-ocean-tower.svg',
 'tier-7-9':'img/items/item-mothership.svg',
 'supply-sprinkles-cookies':'img/items/item-royal-juice.svg',
 'tier-4-10':'img/items/item-star-kingdom.svg',
 'supply-peanut-butter-blossoms':'img/items/item-royal-pastry.svg',
 'mouse-13':'img/items/item-clicker-aether.svg',
 'supply-no-bake-cookies':'img/items/item-crown-cookie.svg',
 'tier-1-11':'img/items/item-global-teamwork.svg',
 'tier-5-10':'img/items/item-cloud-reservoir.svg',
 'supply-florentines':'img/items/item-court-tea.svg',
 'fingers-11':'img/items/item-all-hands-12.svg',
 'tier-9-9':'img/items/item-star-temple.svg',
 'supply-chocolate-crinkles':'img/items/item-gold-cup-drink.svg',
 'supply-maple-cookies':'img/items/item-imperial-bowl.svg',
 'tier-6-10':'img/items/item-cross-mutation.svg',
 'mouse-14':'img/items/item-clicker-omni.svg',
 'supply-persian-rice-cookies':'img/items/item-ceremony-cookie.svg',
 'tier-3-11':'img/items/item-time-circus.svg',
 'supply-norwegian-cookies':'img/items/item-royal-lunch.svg',
 'tier-7-10':'img/items/item-galaxy-net.svg',
 'supply-crispy-rice-cookies':'img/items/item-tribute-box.svg',
 'tier-4-11':'img/items/item-time-domain.svg',
 'supply-ube-cookies':'img/items/item-coronation-pie.svg',
 'supply-butterscotch-cookies':'img/items/item-ocean-banquet.svg',
 'tier-1-12':'img/items/item-time-attendance.svg',
 'tier-5-11':'img/items/item-nebula-filter.svg',
 'supply-speculaas':'img/items/item-honey-apple.svg',
 'tier-9-10':'img/items/item-karma-fruit.svg',
 'supply-chocolate-oatmeal-cookies':'img/items/item-people-meal.svg',
 'tier-6-11':'img/items/item-dimension-tendrils.svg',
 'supply-molasses-cookies':'img/items/item-sea-festival.svg',
 'supply-biscotti':'img/items/item-sponge-milk.svg',
 'tier-3-12':'img/items/item-dream-stage.svg',
 'supply-waffle-cookies':'img/items/item-airy-cake.svg',
 'tier-7-11':'img/items/item-dimension-fold.svg',
 'supply-custard-creams':'img/items/item-coral-jelly.svg',
 'tier-4-12':'img/items/item-crown-all.svg',
 'supply-bourbon-biscuits':'img/items/item-sea-souffle.svg',
 'supply-mini-cookies':'img/items/item-tide-soda.svg',
 'tier-1-13':'img/items/item-infinite-desk.svg',
 'tier-5-12':'img/items/item-time-reservoir.svg',
 'supply-whoopie-pies':'img/items/item-mineral-soup.svg',
 'supply-caramel-wafer-biscuits':'img/items/item-cloud-candy.svg',
 'tier-9-11':'img/items/item-genesis-seed.svg',
 'supply-chocolate-chip-mocha-cookies':'img/items/item-sponge-roll.svg',
 'tier-6-12':'img/items/item-life-rebuild.svg',
 'supply-chai-tea-cookies':'img/items/item-deep-nutrient-dew.svg',
 'supply-earl-grey-cookies':'img/items/item-current-supply.svg',
 'tier-3-13':'img/items/item-endless-curtain.svg',
 'supply-corn-syrup-cookies':'img/items/item-rain-juice.svg',
 'tier-7-12':'img/items/item-time-farm.svg',
 'supply-icebox-cookies':'img/items/item-nebula-meal.svg',
 'tier-4-13':'img/items/item-eternal-reign.svg',
 'supply-graham-crackers':'img/items/item-tide-pie.svg',
 'supply-hardtack':'img/items/item-sea-of-life.svg',
 'tier-1-14':'img/items/item-lifetime-honor.svg',
 'tier-5-13':'img/items/item-infinite-absorb.svg',
 'supply-cornflake-cookies':'img/items/item-mutant-vitamin.svg',
 'supply-gluten-free-cookies':'img/items/item-dual-candy.svg',
 'supply-tofu-cookies':'img/items/item-glow-jelly.svg',
 'tier-9-12':'img/items/item-heavens-harvest.svg',
 'supply-russian-bread-cookies':'img/items/item-tentacle-meal.svg',
 'tier-6-13':'img/items/item-infinite-evolution.svg',
 'supply-lebkuchen':'img/items/item-regen-puree.svg',
 'tier-3-14':'img/items/item-cosmic-comedy.svg',
 'supply-aachener-printen':'img/items/item-cell-vitality.svg',
 'tier-7-13':'img/items/item-infinite-colony.svg',
 'supply-canistrelli':'img/items/item-gene-soup.svg',
 'tier-4-14':'img/items/item-lord-of-seas.svg',
 'supply-nice-biscuits':'img/items/item-spiral-biscuit.svg',
 'supply-french-pure-butter-cookies':'img/items/item-adapt-pack.svg',
 'supply-petit-beurre':'img/items/item-super-jelly-cup.svg',
 'tier-5-14':'img/items/item-living-sea.svg',
 'supply-nanaimo-bars':'img/items/item-split-pie.svg',
 'supply-berger-cookies':'img/items/item-evolution-crate.svg',
 'tier-9-13':'img/items/item-eternal-kingdom.svg',
 'supply-chinsuko':'img/items/item-rebuild-meal.svg',
 'supply-panda-koala-biscuits':'img/items/item-ultimate-banquet.svg',
 'tier-6-14':'img/items/item-ultimate-fish.svg',
 'supply-putri-salju':'img/items/item-freeze-dried.svg',
 'supply-milk-cookies':'img/items/item-ufo-bento.svg',
 'tier-7-14':'img/items/item-cosmic-farm.svg',
 'supply-kruidnoten':'img/items/item-zerog-juice.svg',
 'supply-marie-biscuits':'img/items/item-plasma-jelly.svg',
 'supply-meringue-cookies':'img/items/item-quantum-jam.svg',
 'supply-yogurt-cookies':'img/items/item-space-travel-meal.svg',
 'supply-thumbprint-cookies':'img/items/item-wormhole-ring.svg',
 'tier-9-14':'img/items/item-all-fruit-one.svg',
 'supply-pizzelle':'img/items/item-moon-bar.svg',
 'supply-granola-cookies':'img/items/item-warp-fluid.svg',
 'supply-ricotta-cookies':'img/items/item-galaxy-platter.svg',
 'supply-roze-koeken':'img/items/item-mothership-meal.svg',
 'supply-peanut-butter-cup-cookies':'img/items/item-gravity-pie.svg',
 'supply-sesame-cookies':'img/items/item-parallel-meal.svg',
 'supply-taiyaki':'img/items/item-star-banquet.svg',
 'supply-gomma-cookies':'img/items/item-god-dew.svg',
 'supply-vegan-cookies':'img/items/item-holy-candy.svg',
 'supply-coyotas':'img/items/item-oracle-meal.svg',
 'supply-frosted-sugar-cookies':'img/items/item-dew-drink.svg',
 'supply-marshmallow-sandwich-cookies':'img/items/item-grail-soup.svg',
 'supply-web-cookies':'img/items/item-divine-honey.svg',
 'supply-havreflarn':'img/items/item-star-offering.svg',
 'supply-alfajores':'img/items/item-blessing-meal.svg',
 'supply-gaufrettes':'img/items/item-karma-jam.svg',
 'supply-cookie-bars':'img/items/item-genesis-pie.svg',
 'supply-snowball-cookies':'img/items/item-heaven-feast.svg',
 'supply-sequilhos':'img/items/item-eternal-dew.svg',
 'supply-hazelnut-swirlies':'img/items/item-all-one-meal.svg',
 'supply-spritz-cookies':'img/items/item-infinite-grace.svg',
 'supply-mbatata-cookies':'img/items/item-origin-fruit.svg',
 'supply-springerles':'img/items/item-universe-end-feast.svg',
};
const itemIcon=id=>ITEM_ICONS[id]||'img/items/item-placeholder.svg';
let selectedItem=null,vendingSignature='';
// What has to happen before an item shows up in the vending machine. The
// fields are the ones `unlocked()` tests, so the two cannot drift apart.
function itemUnlock(u){
 if(u.kind==='global')return `累计生产 ${number(Math.ceil(u.earned))} 苹果`;
 if(u.kind==='mouse')return `手动点击累计生产 ${number(Math.ceil(u.handmade))} 苹果`;
 const base=`拥有 ${number(u.need)} 名${BUILDINGS[u.building].name}`;
 return u.kind==='mentor'?`${base}，且至少 1 名${BUILDINGS[1].name}`:base;
}
function itemDescription(u){
 if(u.kind==='global'||u.kind==='fish-global')return `所有鱼人产能 +${u.power}%，与其他补给乘算叠加。`;
 if(u.kind==='mentor')return `${BUILDINGS[1].name}产能 ×2；每 ${u.building-1} 名${BUILDINGS[1].name}让${BUILDINGS[u.building].name}产能 +1%。`;
 const approx=n=>number(Math.round(n));
 if(u.kind==='double'){
  if(u.building===0)return '每次手动点击的基础收益 ×2；兼职鱼人的基础产量 ×2。';
  const production=`${BUILDINGS[u.building].name}产量 ×2`;
  return production+(u.globalBonus?`\n全体产量 +${u.globalBonus}%`:'')+(u.clickPercent?`\n点击收益 +秒产的 1%（约 ${approx(cps()*.01)} 苹果/次）`:'');
 }
 const others=state.owned.slice(1).reduce((a,b)=>a+b,0),before=upgradeEffects().fingers;
 const after=u.synergyIndex===0?.1:before*u.factor;
 const frenzy=state.events.frenzy>0?7:1;
 return `每名其他鱼人提供的协作加成：${precise(before)} → ${precise(after)}。\n按当前 ${number(others)} 名其他鱼人计算：\n每次手动点击的协作收益：约 ${approx(before*others*frenzy)} → ${approx(after*others*frenzy)} 个苹果。\n每名兼职鱼人的协作秒产：约 ${approx(before*others*upgradeEffects().global*frenzy)} → ${approx(after*others*upgradeEffects().global*frenzy)} 个苹果/秒。`;
}
function renderFishUpgradeEffect(u){
 const target=$('fishUpgradeEffect');
 if(u.kind==='double'&&u.building>0){
  const amount=number(Math.round(cps()*.01)),before=precise(currentUnitCps(u.building)),after=precise(currentUnitCps(u.building)*2*(1+(u.globalBonus||0)/100));
  const signature=`double-${u.id}-${amount}-${before}-${after}`;
  if(target.dataset.effectSignature===signature)return;
  target.dataset.effectSignature=signature;
  const make=(className,text)=>{const node=document.createElement('span');node.className=className;node.textContent=text;return node};
  const main=make('upgrade-key-effect',`${BUILDINGS[u.building].name}产量 ×2`);
  if(u.clickPercent)main.append(make('upgrade-click-effect','点击收益 +秒产的 1%'));
  if(u.globalBonus)main.append(make('upgrade-click-effect',`全体产量 +${u.globalBonus}%`));
  const preview=make('upgrade-estimate','');
  preview.append(make('upgrade-estimate-title','预计收益'));
  const production=make('upgrade-estimate-row','');
  production.append(make('upgrade-estimate-label',`每名${BUILDINGS[u.building].name}的秒产`),make('upgrade-estimate-values',`${before} → ${after}`),make('upgrade-estimate-unit','个苹果/秒'));
  preview.append(production);
  if(u.clickPercent){
   const click=make('upgrade-estimate-row','');
   click.append(make('upgrade-estimate-label','每次点击额外获得'),make('upgrade-estimate-values',`约 ${amount} 个苹果`));preview.append(click);
  }
  target.replaceChildren(main,preview);return;
 }
 if(u.kind!=='fingers'){delete target.dataset.effectSignature;setText(target,itemDescription(u));return}
 const others=state.owned.slice(1).reduce((sum,n)=>sum+n,0),before=upgradeEffects().fingers;
 const after=u.synergyIndex===0?.1:before*u.factor,frenzy=state.events.frenzy>0?7:1;
 const make=(className,text)=>{const node=document.createElement('span');node.className=className;node.textContent=text;return node};
 const main=make('upgrade-key-effect','每名其他鱼人提供的协作加成');
 main.append(make('upgrade-key-values',`${precise(before)} → ${precise(after)}`));
 const preview=make('upgrade-estimate','');
 preview.append(make('upgrade-estimate-title','预计收益'),make('upgrade-estimate-note',`按当前 ${number(others)} 名其他鱼人计算`));
 for(const [label,scale,unit] of [['每次手动点击',frenzy,'个苹果/次'],['每名兼职鱼人',upgradeEffects().global*frenzy,'个苹果/秒']]){
  const row=make('upgrade-estimate-row','');
  row.append(make('upgrade-estimate-label',label),make('upgrade-estimate-values',`${number(Math.round(before*others*scale))} → ${number(Math.round(after*others*scale))}`),make('upgrade-estimate-unit',unit));
  preview.append(row);
 }
 const signature=main.textContent+preview.textContent;
 if(target.dataset.effectSignature===signature)return;
 target.dataset.effectSignature=signature;target.replaceChildren(main,preview);
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
function openShop(){return;updateShopClearArea();$('shopShade').hidden=false;document.querySelector('.phone').classList.add('shop-open');returnFocus=document.activeElement;selectedItem=null;$('shopDialog').showModal();render();$('closeShop').focus()}
function closeShop(){$('shopDialog').querySelectorAll('.purchased-item-flight').forEach(el=>{el.getAnimations().forEach(a=>a.cancel());el.remove()});$('shopDialog').close();$('shopShade').hidden=true;document.querySelector('.phone').classList.remove('shop-open');returnFocus?.focus()}
$('produce').addEventListener('click',produce);$('openShop').onclick=()=>notify('未开放');$('closeShop').onclick=closeShop;$('shopDialog').addEventListener('click',e=>{if(e.target===$('shopDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeShop()}});
$('shopDialog').addEventListener('cancel',()=>returnFocus?.focus());
$('shopDialog').addEventListener('close',()=>{$('shopShade').hidden=true;document.querySelector('.phone').classList.remove('shop-open')});
$('buildings').addEventListener('scroll',()=>{document.querySelector('.building-shop').style.backgroundPositionX=`${-$('buildings').scrollLeft}px`},{passive:true});
$('buildings').addEventListener('click',e=>{const arrow=e.target.closest('[data-fish-upgrade]');if(arrow){openFishUpgrade(+arrow.dataset.fishUpgrade);return}const el=e.target.closest('[data-building]');if(!el||el.disabled)return;
 const i=+el.dataset.building;
 if(!buyBuilding(i))notify('苹果不够');
});
function sizeUpgradeDialogs(){
 const box=document.querySelector('.phone').getBoundingClientRect();
 document.documentElement.style.setProperty('--upgrade-game-width',box.width+'px');
}
window.addEventListener('resize',sizeUpgradeDialogs);
function sizeUpgradeDialogs(){
 const box=document.querySelector('.phone').getBoundingClientRect();
 document.documentElement.style.setProperty('--upgrade-game-width',box.width+'px');
}
window.addEventListener('resize',sizeUpgradeDialogs);
function openFishUpgrade(i){
 sizeUpgradeDialogs();upgradeFish=i;renderFishUpgrade();$('fishUpgradeDialog').showModal();
}
function renderFishUpgrade(){
 if(upgradeFish===null)return;
 const u=fishUpgrade(upgradeFish),dialog=$('fishUpgradeDialog');
 setText($('fishUpgradeTitle'),'升级'+BUILDINGS[upgradeFish].name);
 setText($('fishUpgradeLevel'),`Lv.${fishLevel(upgradeFish)}${u?' → Lv.'+(fishLevel(upgradeFish)+1):''}`);
 $('fishUpgradeBody').hidden=!u;$('fishUpgradeEmpty').hidden=!!u;
 if(!u)return;
 dialog.dataset.upgrade=u.id;
 setText($('fishUpgradeName'),u.name);renderFishUpgradeEffect(u);
 setText($('fishUpgradePrice'),number(u.price));
 const can=state.apples+1e-9>=u.price;$('confirmFishUpgrade').disabled=!can;
 setText($('confirmFishUpgrade'),can?'升级':'苹果不足');
}
function renderFactoryUpgrade(){
 const progress=factoryProgress(),next=nextFactoryItem(),percent=progress.done/progress.total*100;
 $('factoryCanUpgradeArrow').toggleAttribute('hidden',!next||!unlocked(next)||state.apples+1e-9<next.price);
 setText($('factoryLevel'),'Lv.'+progress.level);setText($('factoryEntryName'),progress.enhancing?'工厂强化':'工厂升级');setText($('factoryProgressLabel'),`${progress.done}/${progress.total}`);
 const quick=$('quickFactoryUpgrade');quick.disabled=!next||!unlocked(next)||state.apples+1e-9<next.price;
 setText($('quickFactoryPrice'),next?number(next.price):'已完成');
 quick.querySelector('img').hidden=!next;
 quick.setAttribute('aria-label',next?`直接${progress.enhancing?'强化':'升级'}工厂，${number(next.price)}苹果`:'工厂已完成全部强化');
 $('factoryProgressFill').style.width=percent+'%';$('factoryEntry').setAttribute('aria-label',`${progress.enhancing?'工厂强化':'工厂升级'}，等级${progress.level}，进度${progress.done}/${progress.total}`);
 if(!$('factoryUpgradeDialog').open)return;
 $('openNewFactory').hidden=progress.level<4;
 if(progress.level<4)$('newFactoryNotice').hidden=true;
 setText($('factoryStageTitle'),progress.enhancing?'工厂强化 · Lv.4':`苹果工厂 · Lv.${progress.level} → Lv.${progress.level+1}`);
 setText($('factoryStageCount'),progress.enhancing?'工厂等级已完成升级，继续提升全体产量':`阶段 ${progress.stage+1}/3 · 小升级 ${progress.done}/${progress.total}`);
 $('factoryStageFill').style.width=percent+'%';setText($('factoryStageProgress'),`${progress.done}/${progress.total}`);
 $('factoryNext').hidden=!next;$('factoryComplete').hidden=!!next;
 $('factoryCoinReward').hidden=!next;
 if(!next)return;
 setText($('factoryNextName'),next.name);setText($('factoryNextEffect'),next.kind==='factory-recruit'?`${BUILDINGS[next.building].name} +${next.count}`:`全体产量 +${next.power}%`);setText($('factoryNextPrice'),number(next.price));
 const unlockedNow=unlocked(next),can=unlockedNow&&state.apples+1e-9>=next.price;
 $('confirmFactoryUpgrade').disabled=!can;setText($('confirmFactoryUpgrade'),can?(progress.enhancing?'强化进度 +1':'升级进度 +1'):unlockedNow?'苹果不足':'尚未解锁');
 setText($('factoryNextHint'),unlockedNow?'完成本阶段全部小升级，工厂等级提升一级。':itemUnlock(next));
}
$('factoryEntry').onclick=()=>{sizeUpgradeDialogs();$('factoryMilestone').hidden=true;$('newFactoryNotice').hidden=true;$('factoryUpgradeDialog').showModal();renderFactoryUpgrade()};
$('openNewFactory').onclick=()=>{$('newFactoryNotice').hidden=false};
$('closeFactoryUpgrade').onclick=()=> $('factoryUpgradeDialog').close();
let factoryRewardBatch=null,factoryRewardTimer,factoryRewardAnimation;
function clearFactoryReward(){
 clearTimeout(factoryRewardTimer);factoryRewardAnimation?.cancel();factoryRewardBatch=null;$('quickFactoryReward').hidden=true;
}
function showFactoryReward(item,gain,clickBefore=null,clickAfter=null){
 const box=$('quickFactoryReward'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 clearTimeout(factoryRewardTimer);factoryRewardAnimation?.cancel();
 if(!factoryRewardBatch||box.hidden)factoryRewardBatch={fish:new Map(),gain:0,count:0,global:1,clickBefore:null,clickAfter:null};
 const batch=factoryRewardBatch;batch.count++;batch.gain+=gain;
 if(clickBefore!==null){batch.clickBefore??=clickBefore;batch.clickAfter=clickAfter}
 $('quickFactoryClick').hidden=batch.clickBefore===null;
 if(batch.clickBefore!==null)setText($('quickFactoryClick'),`点击基础收益 ${batch.clickBefore} → ${batch.clickAfter}`);
 if(item.kind==='factory-recruit')batch.fish.set(item.building,(batch.fish.get(item.building)||0)+item.count);
 else batch.global*=1+item.power/100;
 let label;
 if(batch.fish.size===1){const [i,count]=batch.fish.entries().next().value;label=`${BUILDINGS[i].name} +${count}`}
 else if(batch.fish.size>1)label=`鱼人 +${[...batch.fish.values()].reduce((a,b)=>a+b,0)}`;
 else label=`全体产量 +${precise((batch.global-1)*100)}%`;
 setText($('quickFactoryGain'),`${label}（+${productionNumber(batch.gain)}/s）`);
 setText($('quickFactoryCoin'),`服装扭蛋硬币 +${batch.count}`);
 box.hidden=false;
 factoryRewardAnimation=box.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:reduce?0:220,easing:'ease-out'});
 factoryRewardTimer=setTimeout(()=>{
  factoryRewardAnimation=box.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-5px)'}],{duration:reduce?0:240,easing:'ease-in',fill:'forwards'});
  factoryRewardAnimation.onfinish=()=>{box.hidden=true;factoryRewardBatch=null};
 },2000);
}
function performFactoryUpgrade(showReward=false){
 $('factoryMilestone').hidden=true;
 const next=nextFactoryItem(),before=factoryProgress().level,beforeCps=cps();
 if(!next||!buyUpgrade(next.id))return false;
 const after=factoryProgress().level;
 if(showReward)showFactoryReward(next,Math.max(0,cps()-beforeCps),after>before?2**(before-1):null,after>before?2**(after-1):null);
 if(after>before){setText($('factoryMilestone'),`工厂升至 Lv.${after}\n点击基础收益 ${2**(before-1)} → ${2**(after-1)}`);$('factoryMilestone').hidden=false;$('factoryEntry').animate([{transform:'scale(1)'},{transform:'scale(1.1)'},{transform:'scale(1)'}],{duration:500});notify('工厂大升级！Lv.'+after)}
 renderFactoryUpgrade();return true;
}
$('quickFactoryUpgrade').onclick=()=>performFactoryUpgrade(true);
$('confirmFactoryUpgrade').onclick=()=>performFactoryUpgrade(false);
$('closeFishUpgrade').onclick=()=> $('fishUpgradeDialog').close();
$('fishUpgradeDialog').addEventListener('close',()=>{upgradeFish=null});
$('fishUpgradeDialog').addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close()}});
$('confirmFishUpgrade').onclick=()=>{const u=fishUpgrade(upgradeFish);if(u)buyUpgrade(u.id);renderFishUpgrade()};
$('upgrades').addEventListener('click',e=>{const icon=e.target.closest('[data-inspect]');if(icon){selectedItem=selectedItem===icon.dataset.inspect?null:icon.dataset.inspect;renderVending();return}const b=e.target.closest('[data-upgrade]');if(b&&!b.disabled)buyUpgrade(b.dataset.upgrade)});
$('buyItem').onclick=()=>{if(selectedItem)buyUpgrade(selectedItem)};
let wardrobeOpen=false,wardrobeMode='single',wardrobeSelected=null,wardrobeGridCategory=null,wardrobeInitTimer;
const wardrobeItemKey=(category,id)=>category+':'+(id??'default');
function initializeCharacterWardrobe(attempt=0){
 clearTimeout(wardrobeInitTimer);
 const fish=document.querySelector('.fish-character')?.contentWindow;
 if(!fish?.characterWardrobeReady?.()){
  if(attempt<100)wardrobeInitTimer=setTimeout(()=>initializeCharacterWardrobe(attempt+1),50);
  return;
 }
 fish.document.body.classList.toggle('wardrobe-preview',wardrobeOpen);
 state.outfit=fish.restoreCharacterOutfit(state.outfit||{skin:'milk-frog',helmet:null});renderWardrobe();
}
function renderWardrobe(){
 const category=wardrobeMode,groups=WARDROBE_CATEGORIES.filter(g=>category==='suit'?g.id==='suit':g.id!=='suit');
 document.querySelectorAll('[data-wardrobe-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.wardrobeMode===wardrobeMode)));
 if(wardrobeGridCategory!==category){
  wardrobeGridCategory=category;
  const sections=groups.map(group=>{
   const section=document.createElement('section');section.className='wardrobe-group';section.dataset.clothingCategory=group.id;
   const title=document.createElement('h3');title.textContent=group.name;section.append(title);
   const grid=document.createElement('div');grid.className='wardrobe-group-grid';
   for(const item of group.items){
    const button=document.createElement('button');button.type='button';button.className='wardrobe-item';button.dataset.wardrobeItem=wardrobeItemKey(group.id,item.id);button.dataset.garmentCategory=group.id;button.dataset.garmentId=item.id??'';
    button.setAttribute('aria-label',item.name);button.setAttribute('aria-pressed','false');
    const img=document.createElement('img');img.src=item.icon;img.alt='';img.draggable=false;button.append(img);grid.append(button);
   }
   section.append(grid);return section;
  });
  $('wardrobeSlots').replaceChildren(...sections);
 }
 const outfit=state.outfit||{skin:'milk-frog',helmet:null};
 $('wardrobeSlots').querySelectorAll('[data-wardrobe-item]').forEach(button=>{
  const id=button.dataset.garmentId||null,wearing=(outfit[button.dataset.garmentCategory]??null)===id;
  button.classList.toggle('wearing',wearing);button.classList.toggle('selected',button.dataset.wardrobeItem===wardrobeSelected);
  button.setAttribute('aria-pressed',String(wearing));
 });
}
$('wardrobeSlots').addEventListener('click',e=>{
 const button=e.target.closest('[data-wardrobe-item]');if(!button)return;
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish?.characterWardrobeReady?.())return;
 wardrobeSelected=button.dataset.wardrobeItem;
 state.outfit=fish.toggleCharacterGarment(button.dataset.garmentCategory,button.dataset.garmentId||null);
 save();renderWardrobe();
});
$('clearWardrobe').onclick=()=>{
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish?.characterWardrobeReady?.())return;
 const skin=fish.getCharacterOutfit().skin;
 state.outfit=fish.restoreCharacterOutfit({skin});wardrobeSelected=null;save();renderWardrobe();
};
document.querySelectorAll('[data-wardrobe-mode]').forEach(button=>button.onclick=()=>{
 wardrobeMode=button.dataset.wardrobeMode;$('wardrobeScroll').scrollTop=0;renderWardrobe();
});
renderWardrobe();initializeCharacterWardrobe();
function showWardrobe(open){
 wardrobeOpen=open;document.querySelector('.phone').classList.toggle('wardrobe-open',open);
 $('wardrobeView').hidden=!open;$('wardrobeView').setAttribute('aria-hidden',String(!open));
 const fish=document.querySelector('.fish-character')?.contentWindow;if(fish?.document?.body)fish.document.body.classList.toggle('wardrobe-preview',open);
 if(open)renderWardrobe();
 if(open)$('wardrobeBack').focus({preventScroll:true});else $('openGacha').focus({preventScroll:true});
}
$('openGacha').onclick=()=>showWardrobe(true);
$('wardrobeBack').onclick=()=>showWardrobe(false);
$('wardrobeGacha').onclick=()=>notify('扭蛋机 · 功能准备中');
$('wardrobeOutdoor').onclick=()=>notify('未开放');
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&wardrobeOpen&&!document.querySelector('dialog[open]'))showWardrobe(false)});
document.querySelectorAll('[data-bulk]').forEach(b=>b.onclick=()=>{bulk=+b.dataset.bulk;render()});document.querySelectorAll('.placeholder').forEach(b=>b.onclick=()=>notify('这个功能稍后开放'));

$('restart').onclick=()=>{if(!confirm('确定重新开始？当前苹果、鱼人和升级进度将被清空。'))return;state=fresh();clearFactoryReward();initializeCharacterWardrobe();displayed=0;bulk=1;workerQueue=[];rateDeferred=0;rateRoll=0;rateFlights=0;resetPurchaseSpeech();save();$('fx').replaceChildren();selectedItem=null;render();notify('新工厂已开工')};
function recordLevelTimes(){
 const level=factoryProgress().level;
 for(let reached=2;reached<=level;reached++)
  if(state.levelTimes[reached]===undefined)state.levelTimes[reached]=state.playSeconds;
}
function update(dt){state.playSeconds+=dt;recordLevelTimes();balancePaintClock+=dt;const buffTime=Math.min(dt,state.events.frenzy),span=dt+6*buffTime;earn(baseCps()*span);updateEvents(dt);updateGoldRain(dt);driveGoldenDance(dt);driveTalk(dt);driveWorkers(dt);driveRateRoll(dt);displayed+=(state.apples-displayed)*(1-Math.exp(-dt*14));if(Math.abs(state.apples-displayed)<.05)displayed=state.apples;saveClock+=dt;if(saveClock>=2){saveClock=0;save()}render()}
// A first rAF timestamp can precede script initialization. Never advance backwards.
function frame(now){const dt=last===null?0:Math.max(0,Math.min((now-last)/1000,.25));last=now;if(!document.hidden)update(dt);requestAnimationFrame(frame)}
document.addEventListener('visibilitychange',()=>{last=null;save()});window.addEventListener('pagehide',save);
window.advanceTime=ms=>{for(let left=ms;left>0;left-=50)update(Math.min(left,50)/1000)};
window.render_game_to_text=()=>JSON.stringify({apples:state.apples,total:state.total,playSeconds:state.playSeconds,guaranteedGold:state.guaranteedGold,factory:factoryProgress(),factorySteps:state.factorySteps,gifted:state.gifted,events:state.events,goldenClicks:state.goldenClicks,globalMultiplier:upgradeEffects().global,cps:cps(),clickPower:clickPower(),bulk,buildings:BUILDINGS.map((b,i)=>({name:b.name,owned:state.owned[i],price:buildingCost(i),visible:visible(i)})),upgrades:state.upgrades,affordableUpgrade:offers().find(u=>u.price<=state.apples)?.id||null,prizes:state.prizes,fishUpgradeOpen:$('fishUpgradeDialog').open,upgradeFish,nextFishUpgrade:upgradeFish===null?null:fishUpgrade(upgradeFish)?.id||null,wardrobeOpen,outfit:state.outfit,wardrobeSelected,wardrobeCategory:wardrobeMode,shopOpen:$('shopDialog').open,vendingItems:offers().slice(0,9).map(u=>({id:u.id,name:u.name,price:u.price,affordable:state.apples>=u.price})),selectedItem});
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
  setText(status,owned?'已拥有':isFishUpgrade(u)?(open?'已解锁 · 在鱼人牌子升级':'未解锁'):u.kind==='global'?'全体强化 · 在工厂升级':'预留扭蛋机');
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
