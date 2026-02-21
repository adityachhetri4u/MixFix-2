"""
MixFix Python backend — librosa audio analysis API
Run: python backend/app.py
Listens on http://localhost:5001
"""

import io
import math
import os
import tempfile

import librosa
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def _rms_waveform(y: np.ndarray, n_segments: int = 32) -> list[float]:
    """Downsample audio to n_segments RMS values, normalised 0-1."""
    hop = max(1, len(y) // n_segments)
    rms = [
        float(np.sqrt(np.mean(y[i * hop : (i + 1) * hop] ** 2)))
        for i in range(n_segments)
    ]
    peak = max(rms) if max(rms) > 0 else 1.0
    return [r / peak for r in rms]


def _detect_issues(y: np.ndarray, sr: int, duration: float, dynamic_range_db: float) -> list[dict]:
    issues = []

    # Clipping
    clip_mask = np.abs(y) > 0.98
    clip_count = int(np.sum(clip_mask))
    clip_ratio = clip_count / max(len(y), 1)
    if clip_ratio > 0.0005:
        first_clip = int(np.argmax(clip_mask)) / sr
        issues.append({
            "type": "Clipping",
            "severity": "high" if clip_ratio > 0.008 else "medium",
            "description": f"Audio clipping detected in {clip_count} samples ({clip_ratio * 100:.2f}% of track).",
            "timestamp": round(first_clip, 2),
        })

    # Low signal level
    rms = float(np.sqrt(np.mean(y ** 2)))
    if rms < 0.01:
        issues.append({
            "type": "Low Level",
            "severity": "medium",
            "description": f"Signal level is very low (RMS {rms:.4f}). Consider normalising or boosting gain.",
            "timestamp": 0.0,
        })

    # Over-compression / sausage waveform
    if dynamic_range_db < 6.0:
        issues.append({
            "type": "Over-Compression",
            "severity": "medium",
            "description": f"Dynamic range is only {dynamic_range_db:.1f} dB. The audio may be over-compressed.",
            "timestamp": round(duration / 2, 2),
        })

    # DC offset
    dc = float(np.abs(np.mean(y)))
    if dc > 0.02:
        issues.append({
            "type": "DC Offset",
            "severity": "low",
            "description": f"DC offset of {dc:.4f} detected. This can cause click artefacts at edit points.",
            "timestamp": 0.0,
        })

    return issues


def _quality_score(issues: list[dict], clip_ratio: float, dynamic_range_db: float) -> int:
    score = 100
    score -= min(40, int(clip_ratio * 3000))
    if dynamic_range_db < 6:
        score -= 15
    for iss in issues:
        if iss["severity"] == "high":
            score -= 10
        elif iss["severity"] == "medium":
            score -= 5
        else:
            score -= 2
    return max(30, score)


@app.route("/api/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    f = request.files["file"]
    ext = "." + f.filename.rsplit(".", 1)[-1].lower() if "." in f.filename else ".wav"
    fmt = ext.lstrip(".").upper()

    # Write to temp file (librosa needs a path for MP3/M4A decoding)
    with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
        f.save(tmp.name)
        tmp_path = tmp.name

    try:
        # Load — keep native sample rate, load as multichannel
        y_raw, sr = librosa.load(tmp_path, sr=None, mono=False)

        if y_raw.ndim > 1:
            channels = y_raw.shape[0]
            y = librosa.to_mono(y_raw)
        else:
            channels = 1
            y = y_raw

        duration = librosa.get_duration(y=y, sr=sr)

        # Tempo
        tempo_arr, _ = librosa.beat.beat_track(y=y, sr=sr)
        tempo = float(np.atleast_1d(tempo_arr)[0])

        # Spectral centroid (mean frequency centre)
        centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
        centroid_mean = float(np.mean(centroid))

        # Zero crossing rate
        zcr = librosa.feature.zero_crossing_rate(y)
        zcr_mean = float(np.mean(zcr))

        # Dynamic range
        peak = float(np.max(np.abs(y)))
        rms_overall = float(np.sqrt(np.mean(y ** 2)))
        dynamic_range_db = float(
            20 * np.log10(peak / (rms_overall + 1e-9))
        ) if rms_overall > 0 else 0.0

        # Clipping ratio (needed for score)
        clip_ratio = float(np.sum(np.abs(y) > 0.98)) / max(len(y), 1)

        waveform_data = _rms_waveform(y, n_segments=32)
        issues = _detect_issues(y, sr, duration, dynamic_range_db)
        rating = _quality_score(issues, clip_ratio, dynamic_range_db)

        return jsonify({
            "sampleRate": int(sr),
            "duration": round(duration, 3),
            "channels": channels,
            "tempo": round(tempo, 1),
            "rms": round(rms_overall, 5),
            "spectralCentroid": round(centroid_mean, 1),
            "zeroCrossingRate": round(zcr_mean, 5),
            "dynamicRange": round(dynamic_range_db, 1),
            "waveformData": waveform_data,
            "format": fmt,
            "issues": issues,
            "rating": rating,
        })

    finally:
        os.unlink(tmp_path)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "librosa": librosa.__version__})


if __name__ == "__main__":
    app.run(port=5001, debug=True)
