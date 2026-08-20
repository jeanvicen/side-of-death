from pathlib import Path
from PIL import Image

ROOT = Path('/home/ubuntu/side-of-death/assets')
FILES = [
    'player-01-reaper-sheet.png',
    'enemy-01-soul-sheet.png',
    'enemy-02-shade-sheet.png',
    'enemy-03-harbinger-sheet.png',
    'boss-01-witch-sheet.png',
]


def clean_pixel(r, g, b, a):
    # These sheets contain bright green chroma contamination from the asset export.
    # Remove only strongly green-dominant pixels; preserve cyan spectral highlights.
    green_dominant = g > 70 and (g - r) > 28 and (g - b) > 24 and g > max(r, b) * 1.18
    if green_dominant:
        return (r, g, b, 0)
    # Remove a small semi-transparent green fringe around silhouettes.
    if g > 48 and (g - r) > 18 and (g - b) > 16 and a > 0:
        factor = max(0, min(1, 1 - ((g - max(r, b)) / 90)))
        return (r, g, b, int(a * factor * 0.35))
    return (r, g, b, a)


def main():
    for name in FILES:
        src = ROOT / name
        dst = ROOT / (src.stem + '-clean.png')
        im = Image.open(src).convert('RGBA')
        px = im.load()
        for y in range(im.height):
            for x in range(im.width):
                px[x, y] = clean_pixel(*px[x, y])
        im.save(dst, optimize=True)
        print(dst)

if __name__ == '__main__':
    main()
