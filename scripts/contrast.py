import sys
def srgb(c):
    c/=255
    return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def L(h):
    h=h.lstrip('#'); r,g,b=(int(h[i:i+2],16) for i in (0,2,4))
    return .2126*srgb(r)+.7152*srgb(g)+.0722*srgb(b)
def cr(a,b):
    la,lb=L(a),L(b)
    hi,lo=max(la,lb),min(la,lb)
    return (hi+.05)/(lo+.05)
def lighten(hex_, k):
    h=hex_.lstrip('#'); v=[int(h[i:i+2],16) for i in (0,2,4)]
    v=[min(255,round(c+(255-c)*k)) for c in v]
    return '#%02X%02X%02X'%tuple(v)
if __name__=='__main__':
    a=sys.argv[1:]
    for i in range(0,len(a),2):
        print(f'{a[i]} on {a[i+1]}: {cr(a[i],a[i+1]):.2f}:1')
