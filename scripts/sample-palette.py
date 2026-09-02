from PIL import Image
from collections import Counter
import colorsys, sys

def clusters(im, box, n=8, step=2):
    px = im.crop(box).convert('RGB')
    c = Counter()
    w,h = px.size
    d = px.load()
    for y in range(0,h,step):
        for x in range(0,w,step):
            r,g,b = d[x,y]
            c[(r//8*8, g//8*8, b//8*8)] += 1
    tot = sum(c.values())
    out=[]
    for (r,g,b),k in c.most_common(n):
        H,S,V = colorsys.rgb_to_hsv(r/255,g/255,b/255)
        out.append((f'#{r:02X}{g:02X}{b:02X}', f'{k*100/tot:.1f}%',
                    f'h{H*360:.0f} s{S*100:.0f} v{V*100:.0f}'))
    return out

def show(label, path, box):
    im = Image.open(path)
    print(f'\n== {label}  {box}')
    for row in clusters(im, box):
        print('   ', *row)

# truck body — flat blue panels, away from graphics/shadow
show('truck body A', 'img/truck.jpg', (255, 1180, 320, 1260))
show('truck body B', 'img/truck.jpg', (860, 700, 910, 800))
show('truck body C', 'img/truck.jpg', (250, 660, 340, 700))
show('truck body D', 'img/truck.jpg', (690, 1050, 760, 1090))
# logo badge + lettering
show('logo whole', 'img/promo-nortenos.jpg', (40, 1140, 360, 1310))
show('logo gold ring', 'img/promo-nortenos.jpg', (60, 1150, 340, 1180))
show('logo red word', 'img/promo-nortenos.jpg', (120, 1175, 330, 1215))
show('promo yellow type', 'img/promo-nortenos.jpg', (120, 210, 1000, 320))
show('promo red band', 'img/promo-nortenos.jpg', (300, 355, 800, 395))
