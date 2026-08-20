from pathlib import Path
import wave
from PIL import Image

root = Path('/home/ubuntu/side-of-death')
for name in ['intro-ost-90s.wav', 'cemetery-ambience.wav'] + [f'voice-cine-{i:02d}.wav' for i in range(1, 9)]:
    path = root / 'assets' / name
    if not path.exists():
        print(f'{name}: MISSING')
        continue
    with wave.open(str(path), 'rb') as audio:
        duration = audio.getnframes() / float(audio.getframerate() or 1)
        print(f'{name}: {duration:.3f}s, {audio.getframerate()}Hz, {audio.getnchannels()}ch')
for name in ['cine-01-cemetery.png', 'cine-02-fugitive-souls.png', 'cine-03-portal.png', 'cine-04-reaper-gate.png', 'cine-05-souls-gate.png']:
    path = root / 'assets' / name
    if path.exists():
        with Image.open(path) as image:
            print(f'{name}: {image.width}x{image.height}')
