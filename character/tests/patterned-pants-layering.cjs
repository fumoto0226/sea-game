// Regression: skins that insert a tail must not move the bare-torso cover behind the torso.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const inputs=['body','width','arms','legs','head'].map(key=>({dataset:{control:key},value:'100'}));
const context=vm.createContext({document:{querySelector:()=>({}),querySelectorAll:()=>inputs},requestAnimationFrame:()=>1,console});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../upstream/script.js'),'utf8').split('resetButton.addEventListener')[0],context);
const result=vm.runInContext(`(()=>{
 const children=[];
 const parent={insertBefore(node,reference){const old=children.indexOf(node);if(old>=0)children.splice(old,1);const at=children.indexOf(reference);children.splice(at<0?children.length:at,0,node);node.parentNode=this;}};
 const make=()=>({attrs:{},style:{},parentNode:parent,setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]},get nextSibling(){return children[children.indexOf(this)+1]||null},get previousSibling(){return children[children.indexOf(this)-1]||null}});
 const torso=make(),cover=make(),tail=make();torso.setAttribute('d','M20 60L70 60L60 130Z');
 torsoMaterial={upperSkin:cover,gradient:make(),upper:[make(),make()],lower:[make(),make()],fabric:make(),upperClip:make()};
 selectedDecorations.pants='loose-wide-pants';selectedDecorations.suit=null;
 const results=[];
 for(const skin of [null,'milk-frog','pochita','alien']){
  selectedDecorations.skin=skin;
  // Reproduce a pre-existing cover behind a newly inserted skin element.
  children.splice(0,children.length,cover,tail,torso);
  for(const controls of [{body:100,width:100,arms:100,legs:100,head:100},{body:120,width:80,arms:120,legs:80,head:110}]){
   updateTorsoMaterial(torso,buildWarp(controls));
   results.push({skin,adjacent:cover.previousSibling===torso,color:cover.attrs.fill===skinColor(),path:cover.attrs.d===torso.attrs.d,clipped:!!torsoMaterial.upperClip.attrs.points});
  }
 }
 selectedDecorations.pants='plain';updateTorsoMaterial(torso,buildWarp({body:100,width:100,arms:100,legs:100,head:100}));
 return {results,coverHidden:cover.style.display==='none'};
})()`,context);
assert.ok(result.results.every(r=>r.adjacent&&r.color&&r.path&&r.clipped));assert.ok(result.coverHidden);
console.log('PASS patterned pants torso cover stays above torso across skins/body shapes; ordinary pants hide cover');
