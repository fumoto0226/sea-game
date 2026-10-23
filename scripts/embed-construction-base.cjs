// Keep the tiny first-stage house in the initial HTML, without an image request.
const fs=require('node:fs'),vm=require('node:vm');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync('factory-build-data.js','utf8')+';this.art=FACTORY_BUILD_ART',context);
const art=context.art,part=art.parts.find(p=>p.step===0);
const content=part.images.map(image=>{
 const svg=fs.readFileSync(image.src,'utf8').trim().replace(/>\s+</g,'><');
 return svg.replace('<svg ',`<svg x="${image.x}" y="${image.y}" `);
}).join('');
const base=`<g data-build-step="0" data-figma-node="${part.node}" class="build-base">${content}</g>`;
const file='index.html',html=fs.readFileSync(file,'utf8');
const start=html.indexOf('<svg id="constructionScene"'),end=html.indexOf('</svg>',start);
if(start<0)throw Error('Missing constructionScene');
// The end marker makes regeneration safe even though this SVG contains nested SVGs.
const marker='<!-- construction-base:end -->';
const oldEnd=html.indexOf(marker,start)>=0?html.indexOf('</svg>',html.indexOf(marker,start)):end;
const opening=html.slice(start,html.indexOf('>',start)+1).replace(/\s(?:width|height|viewBox)="[^"]*"/g,'').replace('>',` width="${art.width}" height="${art.height}" viewBox="0 0 ${art.width} ${art.height}">`);
fs.writeFileSync(file,html.slice(0,start)+opening+'<!-- construction-base:start -->'+base+marker+html.slice(oldEnd));
console.log(`Embedded construction base: ${Buffer.byteLength(content)} bytes; no external f000 request`);
