import sys, types
# torchaudio>=2.9 removed torchaudio.backend; DeepFilterNet only needs the AudioMetaData type name.
import torchaudio
m = types.ModuleType("torchaudio.backend"); c = types.ModuleType("torchaudio.backend.common")
class AudioMetaData: pass
c.AudioMetaData = AudioMetaData; m.common = c
sys.modules["torchaudio.backend"] = m; sys.modules["torchaudio.backend.common"] = c
import numpy as np, torch, soundfile as sf
from df.enhance import enhance, init_df
model, state, _ = init_df(model_base_dir=sys.argv[1], post_filter=False)
a, sr = sf.read(sys.argv[2], dtype="float32")
if a.ndim > 1: a = a.mean(1)
import scipy.signal as ss
a48 = ss.resample_poly(a, 160, 147).astype(np.float32)  # 44.1k -> 48k
atten = float(sys.argv[4]) if len(sys.argv) > 4 else None
out = enhance(model, state, torch.from_numpy(a48)[None], atten_lim_db=atten).squeeze(0).numpy()
o = ss.resample_poly(out, 147, 160).astype(np.float32)[:len(a)]
sf.write(sys.argv[3], o, sr, subtype="FLOAT")
print("ok", len(a)/sr)
