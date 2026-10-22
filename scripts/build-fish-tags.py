from pathlib import Path
import re,json
# Run from the repository root after replacing fish3 SVGs.
shapes=[]
for i in range(1,11):
 s=Path(f'img/svg/fish3-{i}.svg').read_text()
 s=s.replace('<svg ','<svg class="tag-shape" aria-hidden="true" ')
 # Keep original artwork geometry; only the background color and locked silhouette vary.
 start=s.index('<path');end=s.index('/>',start)+2
 s=s[:start]+s[start:end].replace('#CCDC45','var(--tag-color)')+'<g class="tag-art">'+s[end:]
 s=s.replace('</g>\n<defs>','</g></g>\n<defs>',1)
 ids=re.findall(r'id="([^"]+)"',s)
 for old in ids:s=s.replace(old,f'fishTag{i}_{old}')
 shapes.append(s)
p=Path('game.js');s=p.read_text();a=s.index('const FISH_TAGS=');z=s.index("$('buildings').innerHTML=",a);s=s[:a]+'const FISH_TAGS='+json.dumps(shapes)+';\n'+s[z:]

p.write_text(s)
