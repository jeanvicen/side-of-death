import math
import wave
from pathlib import Path

import numpy as np

SAMPLE_RATE = 44100
DURATION = 90.0
N = int(SAMPLE_RATE * DURATION)
rng = np.random.default_rng(2048)
t = np.arange(N, dtype=np.float32) / SAMPLE_RATE
mix = np.zeros(N, dtype=np.float32)

# Ambient bed: two slow-moving minor drones with filtered noise.
for freq, amp, phase in [(36.708, 0.075, 0.0), (55.0, 0.045, 1.8), (73.416, 0.028, 0.7)]:
    movement = 0.72 + 0.28 * np.sin(2 * np.pi * (0.025 + freq / 8000) * t + phase)
    mix += amp * movement * np.sin(2 * np.pi * freq * t + phase)
    mix += amp * 0.25 * movement * np.sin(2 * np.pi * (freq * 2.01) * t)

# Slow bowed-string pulse that grows around the pursuit and portal sections.
for freq, amp in [(73.416, 0.07), (110.0, 0.045), (146.832, 0.028)]:
    pulse = np.maximum(0.0, np.sin(2 * np.pi * 0.46 * t - 0.8)) ** 2
    envelope = np.clip((t - 12) / 20, 0, 1) * np.clip((90 - t) / 8, 0, 1)
    mix += amp * pulse * envelope * np.sin(2 * np.pi * freq * t + 0.4 * np.sin(t * 0.2))

# Distant three-note motif, deliberately sparse and unresolved.
notes = [73.416, 87.307, 77.782]
for start in np.arange(16, 82, 7.0):
    note = notes[int((start - 16) // 7) % len(notes)]
    length = 1.25
    i0 = int(start * SAMPLE_RATE)
    i1 = min(N, int((start + length) * SAMPLE_RATE))
    if i0 >= N:
        continue
    local = t[i0:i1] - start
    env = np.minimum(local / 0.08, 1.0) * np.exp(-local * 1.45)
    tone = np.sin(2 * np.pi * note * local) + 0.35 * np.sin(2 * np.pi * note * 2.01 * local)
    mix[i0:i1] += 0.11 * env * tone

# Low drum impacts at narrative beats.
def add_hit(time_s, amp, freq, decay):
    i0 = int(time_s * SAMPLE_RATE)
    length = int(min(2.5, decay * 7.0) * SAMPLE_RATE)
    i1 = min(N, i0 + length)
    if i0 < 0 or i0 >= N or i1 <= i0:
        return
    local = np.arange(i1 - i0, dtype=np.float32) / SAMPLE_RATE
    env = np.exp(-local * decay)
    body = np.sin(2 * np.pi * freq * local) + 0.28 * np.sin(2 * np.pi * (freq * 1.7) * local)
    noise = rng.normal(0, 1, i1 - i0).astype(np.float32)
    mix[i0:i1] += amp * env * (0.82 * body + 0.08 * noise)

for ts, amp, freq, decay in [(18, .16, 54, 2.2), (28, .20, 48, 2.0), (38, .22, 42, 1.8), (48, .28, 39, 1.6), (56, .34, 36, 1.45), (65, .42, 32, 1.3), (74, .32, 38, 1.55), (82, .58, 30, 1.05), (86, .68, 28, .9)]:
    add_hit(ts, amp, freq, decay)

# Metallic portal shimmer: short high partials with decaying envelopes.
for ts in [50.0, 54.5, 59.0, 64.0, 69.0, 74.0, 81.5, 86.0]:
    i0 = int(ts * SAMPLE_RATE)
    length = int(2.4 * SAMPLE_RATE)
    i1 = min(N, i0 + length)
    local = np.arange(i1 - i0, dtype=np.float32) / SAMPLE_RATE
    env = np.exp(-local * 2.6)
    metal = (np.sin(2 * np.pi * 1180 * local) + .55 * np.sin(2 * np.pi * 1770.5 * local) + .28 * np.sin(2 * np.pi * 2410.25 * local))
    mix[i0:i1] += .032 * env * metal

# Atmospheric filtered noise with a very slow movement.
noise = rng.normal(0, 1, N).astype(np.float32)
smoothed = np.convolve(noise, np.ones(401, dtype=np.float32) / 401, mode='same')
noise_env = 0.014 + 0.026 * np.clip((t - 10) / 70, 0, 1)
mix += noise_env * smoothed

# Narrative intensity curve and gentle fade-in/out.
intensity = np.interp(t, [0, 10, 30, 50, 66, 78, 90], [0.24, 0.42, 0.58, 0.78, 0.92, 0.64, 0.18])
fade_in = np.clip(t / 2.5, 0, 1)
fade_out = np.clip((90 - t) / 4.0, 0, 1)
mix *= intensity * fade_in * fade_out

# Soft saturation and normalization.
mix = np.tanh(mix * 1.8)
peak = max(float(np.max(np.abs(mix))), 1e-6)
mix = mix / peak * 0.78
stereo = np.stack([mix, mix * 0.985], axis=1)
pcm = np.clip(stereo * 32767, -32768, 32767).astype(np.int16)

out = Path('/home/ubuntu/side-of-death/assets/intro-ost-90s.wav')
out.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(out), 'wb') as audio:
    audio.setnchannels(2)
    audio.setsampwidth(2)
    audio.setframerate(SAMPLE_RATE)
    audio.writeframes(pcm.tobytes())
print(f'Wrote {out} ({DURATION:.0f}s, {SAMPLE_RATE} Hz, stereo)')
