from __future__ import annotations

import wave
from pathlib import Path

import numpy as np

SR = 44100
DURATION = 75.0
N = int(SR * DURATION)
rng = np.random.default_rng(23082026)
t = np.arange(N, dtype=np.float32) / SR
left = np.zeros(N, dtype=np.float32)
right = np.zeros(N, dtype=np.float32)

def smooth_noise(scale: int) -> np.ndarray:
    small = rng.normal(0.0, 1.0, max(2, N // scale + 2)).astype(np.float32)
    x = np.linspace(0, len(small) - 1, N, dtype=np.float32)
    return np.interp(x, np.arange(len(small), dtype=np.float32), small).astype(np.float32)

def add_stereo(signal: np.ndarray, pan: float = 0.0, gain: float = 1.0) -> None:
    l = gain * (1.0 - max(0.0, pan))
    r = gain * (1.0 + min(0.0, pan))
    left[:] += signal * l
    right[:] += signal * r

def add_event(start: float, duration: float, signal: np.ndarray, pan: float, gain: float) -> None:
    a = max(0, int(start * SR))
    b = min(N, a + len(signal))
    if b <= a:
        return
    segment = signal[: b - a]
    left[a:b] += segment * (1.0 - max(0.0, pan)) * gain
    right[a:b] += segment * (1.0 + min(0.0, pan)) * gain

# Moving low-frequency wind with a second high, airy layer.
wind = smooth_noise(900)
wind_hi = smooth_noise(90)
wind_env = 0.46 + 0.25 * np.sin(2 * np.pi * t / 17.0) + 0.12 * np.sin(2 * np.pi * t / 7.4 + 1.2)
wind_sig = (0.055 * wind + 0.018 * wind_hi) * np.maximum(0.0, wind_env)
add_stereo(wind_sig, -0.18, 1.0)
add_stereo(np.roll(wind_sig, 1800), 0.2, 0.72)

# Distant resonant bells, intentionally sparse and non-melodic.
for start, freq, pan, gain in [(5.5, 98, -0.55, 0.34), (24.0, 73, 0.48, 0.28), (46.2, 123, -0.35, 0.26), (67.7, 82, 0.42, 0.32)]:
    length = int(6.5 * SR)
    tt = np.arange(length, dtype=np.float32) / SR
    bell = (np.sin(2 * np.pi * freq * tt) + 0.36 * np.sin(2 * np.pi * freq * 2.17 * tt))
    bell *= np.exp(-0.72 * tt) * (1.0 - np.exp(-45.0 * tt))
    add_event(start, 6.5, bell.astype(np.float32), pan, gain)

# Spectral whisper textures: filtered, slowly moving noise bursts.
for start, dur, pan in [(12.0, 4.5, -0.75), (18.5, 3.5, 0.72), (31.0, 5.0, -0.2), (39.5, 3.2, 0.6), (53.5, 4.8, -0.62), (61.0, 3.7, 0.28)]:
    length = int(dur * SR)
    tt = np.arange(length, dtype=np.float32) / SR
    raw = rng.normal(0.0, 1.0, length).astype(np.float32)
    # A broad tremolo and gentle fade make the texture read as breath rather than static.
    env = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 1.6
    trem = 0.58 + 0.42 * np.sin(2 * np.pi * (1.2 + 0.3 * np.sin(start)) * tt)
    whisper = 0.022 * raw * env * trem
    whisper += 0.010 * np.sin(2 * np.pi * (180 + 24 * np.sin(tt * 0.7)) * tt) * env
    add_event(start, dur, whisper.astype(np.float32), pan, 1.0)

# Portal pulses grow near the end of the ambience.
for start, strength in [(20.0, 0.32), (34.0, 0.38), (48.0, 0.46), (60.5, 0.56), (69.0, 0.7)]:
    length = int(2.8 * SR)
    tt = np.arange(length, dtype=np.float32) / SR
    env = np.sin(np.pi * np.clip(tt / 2.8, 0, 1)) ** 1.2
    pulse = strength * env * (0.7 * np.sin(2 * np.pi * 44 * tt) + 0.22 * np.sin(2 * np.pi * 88 * tt))
    pulse += 0.025 * rng.normal(0.0, 1.0, length).astype(np.float32) * env
    add_event(start, 2.8, pulse.astype(np.float32), 0.1 if start % 2 else -0.1, 1.0)

# Final low swell for the handoff into gameplay.
swell = np.sin(2 * np.pi * (38 + 10 * t) * t) * (np.clip((t - 65) / 10, 0, 1) ** 1.4)
add_stereo((0.04 * swell).astype(np.float32), 0.0, 1.0)

peak = max(float(np.max(np.abs(left))), float(np.max(np.abs(right))), 1e-6)
left = np.clip(left / peak * 0.82, -1.0, 1.0)
right = np.clip(right / peak * 0.82, -1.0, 1.0)
interleaved = np.column_stack((left, right))
pcm = (interleaved * 32767.0).astype('<i2')

out = Path('/home/ubuntu/side-of-death/assets/cemetery-ambience.wav')
out.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(out), 'wb') as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(pcm.tobytes())
print(f'created {out} duration={DURATION:.1f}s frames={N}')
