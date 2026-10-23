"""Derive animated SVGs from the original artwork, preserving its drawing order."""
from pathlib import Path
import copy
import xml.etree.ElementTree as E
S='http://www.w3.org/2000/svg'
E.register_namespace('',S);E.register_namespace('xlink','http://www.w3.org/1999/xlink')
def el(tag,**attrs): return E.Element('{'+S+'}'+tag,attrs)
for name in ['apple-bg1-1','apple-bg1-1-gold']:
 root=E.parse('img/svg/'+name+'.svg').getroot()
 # Rear support, joint housing, forearm and rigid claw pivot together at the concealed base.
 original=list(root)
 rest=el('g',**{'class':'robot-static'})
 swing=el('g',id='robot-swing',**{'class':'robot-motion'})
 for e in original[0:12]:
  root.remove(e);rest.append(copy.deepcopy(e));swing.append(e)
 reach=el('g',id='robot-reach')
 for e in original[6:12]:
  swing.remove(e);reach.append(e)
 reach.append(el('animateTransform',attributeName='transform',type='rotate',values='0 128 11;6 128 11;2 128 11;6 128 11;2 128 11;0 128 11;0 128 11;0 128 11',keyTimes='0;.22;.37;.53;.68;.88;.94;1',dur='4.5s',repeatCount='indefinite',calcMode='spline',keySplines=';'.join(['.42 0 .58 1']*7)))
 swing.append(reach)
 swing.append(el('animateTransform',attributeName='transform',type='rotate',values='0 128 43;-10 128 43;-4 128 43;-10 128 43;-4 128 43;0 128 43;0 128 43;0 128 43',keyTimes='0;.22;.37;.53;.68;.88;.94;1',dur='4.5s',repeatCount='indefinite',calcMode='spline',keySplines=';'.join(['.42 0 .58 1']*7)))
 root.insert(0,rest);root.insert(1,swing)
 # Move this whole tree, including its apples, around the foot of its trunk.
 tree_rest=el('g',**{'class':'robot-static'})
 tree=el('g',id='poked-tree',**{'class':'robot-motion'})
 tree_index=list(root).index(original[118])
 for e in original[118:140]:
  root.remove(e);tree_rest.append(copy.deepcopy(e));tree.append(e)
 tree.append(el('animateTransform',attributeName='transform',type='rotate',values='0 82 43;0 82 43;-3 82 43;2 82 43;0 82 43;0 82 43;-3 82 43;2 82 43;0 82 43;0 82 43',keyTimes='0;.21;.24;.30;.37;.52;.55;.61;.68;1',dur='4.5s',repeatCount='indefinite',calcMode='spline',keySplines=';'.join(['.42 0 .58 1']*9)))
 root.insert(tree_index,tree_rest);root.insert(tree_index+1,tree)
 children=list(root)
 # Same geometry and layer order in the normal and golden source exports.
 surface=next(e for e in children if e.get('d','').startswith('M155.693 153.248'))
 start=children.index(surface)+1
 stripes=children[start:start+8]
 assert all(e.tag.endswith('path') for e in stripes)
 static=el('g',**{'class':'conveyor-static'})
 for e in stripes: root.remove(e);static.append(e)
 root.insert(start,static)
 animated=el('g',**{'class':'conveyor-motion'})
 clip=el('clipPath',id='moving-belt-clip');clip.append(el('path',d=surface.get('d')));animated.append(clip)
 lines=el('g',**{'clip-path':'url(#moving-belt-clip)'})
 sections=['M104.7 93.7L104.7 93.7','M109.168 96.476L104.278 98.960','M119.363 102.635L104.562 111.355','M131.033 109.931L108.211 123.904','M143.531 117.1L120.217 131.384','M155.512 124.241L132.094 138.705','M166.923 131.046L144.152 146.235','M173.522 134.773L160.972 156.095','M179.986 138.654L179.602 160.338','M204.8 153.3L204.8 153.3']
 for i in range(9):
  line=el('path',d=sections[i],stroke='black',**{'stroke-width':'.282','fill':'none'})
  line.append(el('animate',attributeName='d',values=';'.join(sections),dur='9s',begin=f'-{i}s',repeatCount='indefinite',calcMode='linear'))
  lines.append(line)
 animated.append(lines);root.insert(start+1,animated)
 # The eight source apples comprise use/mask/body/stem paths in contiguous layers.
 children=list(root)
 first=next(i for i,e in enumerate(children) if e.tag.endswith('use') and 'stroke105_' in next(iter(e.attrib.values()),''))
 last=next(i for i,e in enumerate(children) if e.get('d','').startswith('M92.7205 147.475'))
 apple_static=el('g',**{'class':'conveyor-static'})
 for e in children[first:last]:root.remove(e);apple_static.append(e)
 root.insert(first,apple_static)
 apples=el('g',**{'class':'conveyor-motion'})
 clip=el('clipPath',id='moving-apples-clip');clip.append(el('path',d='M104.8 91Q102.6 107 106.3 126L155 158Q181 172 207 154L210 130L131 88Z'));apples.append(clip)
 flow=el('g',**{'clip-path':'url(#moving-apples-clip)'})
 # Reuse the original apple's body, notch, and stem at its original scale.
 body=next(e for e in root.iter() if e.get('id','').startswith('stroke109_'))
 details=[e for e in apple_static if e.get('d','').startswith(('M161.267','M160.351','M161.202'))]
 template=el('g',transform='translate(-162 -141)')
 b=copy.deepcopy(body);b.attrib.pop('id',None);b.set('fill',next(e.get('fill') for e in apple_static if e.tag.endswith('use') and 'stroke109_' in str(e.attrib)));template.append(b)
 for e in details:template.append(copy.deepcopy(e))
 for i in range(8):
  moving=el('g');moving.append(copy.deepcopy(template))
  moving.append(el('animateMotion',path='M102 100 L169 144 Q182 153 195 143 L199 145',dur='9s',begin=f'-{i*1.125}s',repeatCount='indefinite',calcMode='paced'))
  moving.append(el('animate',attributeName='opacity',values='0;1;1;0',keyTimes='0;.025;.96;1',dur='9s',begin=f'-{i*1.125}s',repeatCount='indefinite'))
  flow.append(moving)
 apples.append(flow);root.insert(first+1,apples)
 style=el('style');style.text='.conveyor-static,.robot-static{display:none}@media(prefers-reduced-motion:reduce){.conveyor-motion,.robot-motion{display:none}.conveyor-static,.robot-static{display:inline}}';root.insert(0,style)
 # Golden frenzy runs all motion at ten times normal speed, retaining phase spacing between apples/seams.
 if name.endswith('-gold'):
  for animation in root.iter():
   if animation.tag.rsplit('}',1)[-1] in ('animate','animateMotion','animateTransform'):
    for attribute in ('dur','begin'):
     value=animation.get(attribute)
     if value and value.endswith('s'):animation.set(attribute,f'{float(value[:-1])/10:g}s')
 E.ElementTree(root).write('img/svg/'+name+'-animated.svg',encoding='unicode')
