from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / 'icons'
OUT.mkdir(parents=True, exist_ok=True)


def make_icon(size: int, maskable: bool = False) -> Image.Image:
    img = Image.new('RGBA', (size, size), '#050208')
    draw = ImageDraw.Draw(img)
    s = size

    # Moldura pixelada e halo de sangue, mantendo a área segura para ícones adaptativos.
    margin = int(s * (0.08 if maskable else 0.045))
    draw.rectangle((margin, margin, s - margin - 1, s - margin - 1), outline='#3d0c14', width=max(2, s // 32))
    draw.rectangle((margin + s // 32, margin + s // 32, s - margin - s // 32 - 1, s - margin - s // 32 - 1), outline='#160a0d', width=max(2, s // 48))

    # Cruz de brilho discreta no centro.
    c = s // 2
    glow = '#7a0012'
    draw.rectangle((c - s // 5, c - s // 80, c + s // 5, c + s // 80), fill=glow)
    draw.rectangle((c - s // 80, c - s // 5, c + s // 80, c + s // 5), fill=glow)

    # Cabo da foice em blocos para preservar o visual pixel-art.
    handle = '#6b4a2f'
    handle_dark = '#4a3018'
    draw.rectangle((int(s * .47), int(s * .31), int(s * .55), int(s * .83)), fill=handle)
    draw.rectangle((int(s * .55), int(s * .31), int(s * .59), int(s * .83)), fill=handle_dark)

    # Lâmina curva e ponta, em tons frios e alto contraste.
    steel = '#cfd4dd'
    steel_mid = '#8f97a6'
    steel_dark = '#59616d'
    draw.rectangle((int(s * .29), int(s * .22), int(s * .47), int(s * .28)), fill=steel)
    draw.rectangle((int(s * .24), int(s * .27), int(s * .34), int(s * .34)), fill=steel)
    draw.rectangle((int(s * .18), int(s * .34), int(s * .27), int(s * .42)), fill=steel)
    draw.rectangle((int(s * .14), int(s * .42), int(s * .22), int(s * .55)), fill=steel_mid)
    draw.rectangle((int(s * .18), int(s * .55), int(s * .26), int(s * .61)), fill=steel_dark)
    draw.rectangle((int(s * .24), int(s * .60), int(s * .34), int(s * .65)), fill=steel_dark)
    draw.rectangle((int(s * .33), int(s * .64), int(s * .44), int(s * .68)), fill=steel_dark)
    draw.rectangle((int(s * .43), int(s * .61), int(s * .50), int(s * .65)), fill=steel_mid)
    draw.rectangle((int(s * .49), int(s * .56), int(s * .56), int(s * .62)), fill=steel)
    draw.rectangle((int(s * .55), int(s * .50), int(s * .63), int(s * .57)), fill=steel)
    draw.rectangle((int(s * .62), int(s * .44), int(s * .70), int(s * .52)), fill=steel)
    draw.rectangle((int(s * .69), int(s * .37), int(s * .78), int(s * .46)), fill=steel)
    draw.rectangle((int(s * .77), int(s * .31), int(s * .86), int(s * .39)), fill=steel)
    draw.rectangle((int(s * .84), int(s * .27), int(s * .90), int(s * .33)), fill=steel_mid)

    # Ponto vermelho já presente na introdução original.
    red = '#ff1128'
    red_dark = '#7a0012'
    draw.rectangle((int(s * .45), int(s * .25), int(s * .54), int(s * .34)), fill=red_dark)
    draw.rectangle((int(s * .48), int(s * .27), int(s * .53), int(s * .32)), fill=red)

    # Pequenos respingos nas bordas, sem texto.
    for x, y, w, h in [(.17, .72, .035, .12), (.26, .80, .025, .08), (.73, .71, .03, .13), (.82, .78, .025, .08)]:
        draw.rectangle((int(s*x), int(s*y), int(s*(x+w)), int(s*(y+h))), fill='#d90429')

    return img

for size in (192, 512):
    make_icon(size).save(OUT / f'icon-{size}.png', optimize=True)
make_icon(512, maskable=True).save(OUT / 'icon-maskable-512.png', optimize=True)
