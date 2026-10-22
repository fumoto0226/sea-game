// Run against the local game after changing worker artwork or motion tracks.
// PLAYWRIGHT_MODULE may point to an externally installed Playwright package.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage();await page.goto(process.env.GAME_URL||'http://localhost:5180');
 await page.waitForFunction(()=>window.CHARACTER_SRCDOC);
 const result=await page.evaluate(async(look)=>{
  const frame=document.createElement('iframe');frame.srcdoc=window.CHARACTER_SRCDOC;document.body.append(frame);
  await new Promise(resolve=>frame.onload=resolve);
  const w=frame.contentWindow;w.setWorkerLook(look);
  const cellW=256,cellH=376,cols=8;
  const poses=[['idle',0]];
  for(let i=0;i<27;i++)poses.push(['walk',i/30]);
  for(let i=0;i<=45;i++)poses.push(['wave',i/30]);
  const canvas=document.createElement('canvas');canvas.width=cols*cellW;canvas.height=Math.ceil(poses.length/cols)*cellH;
  const ctx=canvas.getContext('2d');
  for(let i=0;i<poses.length;i++){
   const [mode,time]=poses[i];w.advanceWorkerMotion(0,'idle');w.advanceWorkerMotion(0,mode);
   for(let t=0;t<time;t+=.1)w.advanceWorkerMotion(Math.min(.1,time-t),mode);
   const svg=w.document.querySelector('#character svg').cloneNode(true);
   svg.setAttribute('viewBox','-49 -44 195 286');svg.setAttribute('width',cellW);svg.setAttribute('height',cellH);
   const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}));
   const img=new Image();img.src=url;await img.decode();
   ctx.drawImage(img,(i%cols)*cellW,Math.floor(i/cols)*cellH,cellW,cellH);URL.revokeObjectURL(url);
  }
  frame.remove();return canvas.toDataURL('image/webp',.95).split(',')[1];
 },process.env.WORKER_LOOK?JSON.parse(process.env.WORKER_LOOK):process.env.WORKER_SUIT?{suit:process.env.WORKER_SUIT,helmet:null}:{});
 fs.writeFileSync(process.env.WORKER_OUTPUT||'img/worker-atlas.webp',Buffer.from(result,'base64'));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
