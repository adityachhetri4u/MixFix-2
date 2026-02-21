import React, { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/Dashboard.css'
import TextType from './TextType'
import type { AudioInfo } from '../App'

interface DashboardProps {
  onFileUpload: (file: File) => void
  onStartAnalysis: () => void
  isAnalyzing: boolean
  audioUrl: string | null
  hasLoadedFile: boolean
  fileName?: string
  audioInfo: AudioInfo | null
}

const Dashboard: React.FC<DashboardProps> = ({
  onFileUpload,
  onStartAnalysis,
  isAnalyzing,
  audioUrl,
  hasLoadedFile,
  fileName,
  audioInfo,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeMode, setActiveMode] = useState<'waveform' | 'spectrum' | 'phase'>('waveform')
  const [isTapeLoading, setIsTapeLoading] = useState(false)
  const [knobGain] = useState(72)
  const [knobEQ]  = useState(50)
  const [knobLevel] = useState(85)
  const [screenTyped, setScreenTyped] = useState(false)

  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
  }, [audioUrl])

  // Reset typing animation whenever a new file is loaded
  useEffect(() => {
    if (hasLoadedFile) setScreenTyped(false)
  }, [hasLoadedFile])

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = isLooping
  }, [isLooping])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (hasLoadedFile || isAnalyzing) return
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('audio/')) {
      setIsTapeLoading(true)
      setTimeout(() => setIsTapeLoading(false), 600)
      onFileUpload(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsTapeLoading(true)
      setTimeout(() => setIsTapeLoading(false), 600)
      onFileUpload(file)
    }
  }

  const handlePlay = async () => {
    if (!audioRef.current) return
    try { await audioRef.current.play(); setIsPlaying(true) } catch { setIsPlaying(false) }
  }

  const handlePause = () => {
    audioRef.current?.pause(); setIsPlaying(false)
  }

  const handleStop = () => {
    if (!audioRef.current) return
    audioRef.current.pause(); audioRef.current.currentTime = 0
    setIsPlaying(false); setProgress(0)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current?.duration) return
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !duration) return
    audioRef.current.currentTime = (Number(e.target.value) / 100) * duration
    setProgress(Number(e.target.value))
  }

  // SVG ring helper — 270deg arc (135deg to 405deg), r=26
  const RING_R = 26
  const RING_CIRC = 2 * Math.PI * RING_R  // ~163.4
  const RING_ARC  = 0.75 * RING_CIRC       // 270deg of full circle
  const ringOffset = (pct: number) => RING_CIRC - (pct / 100) * RING_ARC

  // idle waveform bars — 32 bars, realistic audio shape
  const idleBars = useMemo(() => [
    0.22,0.38,0.55,0.72,0.85,0.91,0.78,0.62,
    0.48,0.71,0.88,0.95,0.82,0.67,0.53,0.40,
    0.58,0.74,0.90,0.83,0.69,0.54,0.78,0.92,
    0.86,0.70,0.55,0.41,0.62,0.48,0.33,0.20,
  ], [])

  // time formatter — defined early so useMemos below can reference it
  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '00:00'
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Use real librosa waveform when available, pad/trim to always 32 bars
  const displayBars = useMemo(() => {
    if (!audioInfo?.waveformData?.length) return idleBars
    const data = audioInfo.waveformData
    if (data.length >= 32) return data.slice(0, 32)
    // pad
    const padded = [...data]
    while (padded.length < 32) padded.push(data[padded.length % data.length])
    return padded
  }, [audioInfo, idleBars])

  // TextType sentences shown while playing — swap in real data when available
  const playingStats = useMemo(() => {
    if (!audioInfo) return ['PLAYING...']
    const ch = audioInfo.channels === 2 ? 'STEREO' : audioInfo.channels === 1 ? 'MONO' : `${audioInfo.channels}ch`
    return [
      `SR: ${(audioInfo.sampleRate / 1000).toFixed(1)} kHz  ·  ${ch}`,
      `DURATION: ${formatTime(audioInfo.duration)}  ·  ${audioInfo.format}`,
      audioInfo.tempo > 0 ? `TEMPO: ${Math.round(audioInfo.tempo)} BPM` : `✓ READY`,
      `DYN RANGE: ${audioInfo.dynamicRange.toFixed(1)} dB`,
      'PLAYING...',
    ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioInfo])
  const currentTime = (progress / 100) * duration

  const displayStatus = isAnalyzing
    ? 'SCANNING...'
    : hasLoadedFile
    ? `LOADED: ${fileName ?? 'TAPE'}`
    : 'NO TAPE — INSERT MEDIA'

  return (
    <div
      className={`dashboard hardware-console ${isPlaying ? 'playing' : ''} ${hasLoadedFile ? 'loaded' : ''} ${isAnalyzing ? 'analyzing' : ''}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <audio ref={audioRef} src={audioUrl ?? undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* ── TOP BAR ── */}
      <div className="hw-top-bar">
        <div className="hw-brand">
          <span className="hw-brand-name">MixFix</span>
          <span className="hw-brand-sub">AI AUDIO ANALYSIS SYSTEM</span>
        </div>
        <div className="hw-top-indicators">
          <div className="hw-led-group">
            <span className={`hw-led-dot hw-led-green ${hasLoadedFile ? 'on' : ''}`}></span>
            <span className="hw-led-label">PWR</span>
          </div>
          <div className="hw-led-group">
            <span className={`hw-led-dot hw-led-red ${isAnalyzing ? 'on pulse' : ''}`}></span>
            <span className="hw-led-label">SCAN</span>
          </div>
          <div className="hw-led-group">
            <span className={`hw-led-dot hw-led-amber ${isPlaying ? 'on' : ''}`}></span>
            <span className="hw-led-label">PLAY</span>
          </div>
        </div>
      </div>


      {/* ── CRT SCREEN SECTION (UPPER) ── */}
      <section className="crt-section">
        <div className="crt-bezel">
          <div className={`crt-screen ${isPlaying ? 'active' : ''} ${isAnalyzing ? 'scanning' : ''}`}>

            {/* Status line */}
            <div className="crt-status-line">
              {hasLoadedFile && !screenTyped ? (
                <TextType
                  as="span"
                  text={`MEDIA LOADED — ${fileName ?? 'TAPE'}`}
                  className="crt-status-text"
                  typingSpeed={40}
                  initialDelay={350}
                  loop={false}
                  showCursor
                  cursorCharacter="_"
                  onSentenceComplete={() => setScreenTyped(true)}
                />
              ) : isPlaying ? (
                <TextType
                  as="span"
                  text={playingStats}
                  className="crt-status-text crt-status-playing"
                  typingSpeed={32}
                  deletingSpeed={16}
                  pauseDuration={1600}
                  loop
                  showCursor
                  cursorCharacter="_"
                  hideCursorWhileTyping
                />
              ) : (
                <span className={`crt-status-text${hasLoadedFile && screenTyped ? ' tt-static-blink' : ''}`}>
                  {displayStatus}
                </span>
              )}
              <span className="crt-mode-badge">{activeMode.toUpperCase()}</span>
              <span className="crt-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>

            {/* Waveform area */}
            <div className="crt-waveform-area">
              <div className="crt-grid-overlay"></div>
              <div className="crt-baseline"></div>
              {displayBars.map((bar, i) => {
                const barProgress = (i / displayBars.length) * 100
                const isAhead = barProgress > progress
                return (
                  <div
                    key={i}
                    className={[
                      'crt-wave-bar',
                      isPlaying ? 'animate' : '',
                      bar > 0.75 ? 'peak' : '',
                      hasLoadedFile && isPlaying && isAhead ? 'dim' : '',
                    ].filter(Boolean).join(' ')}
                    style={{
                      height: `${Math.max(8, Math.round(bar * 120))}px`,
                      animationDelay: `${i * 0.04}s`,
                    }}
                  />
                )
              })}
            </div>

            {/* Progress */}
            <div className="crt-progress-wrap">
              <div className="crt-progress-track">
                <div className="crt-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <input type="range" className="crt-progress-input"
                min={0} max={100} value={progress} onChange={handleSeek}
                disabled={!hasLoadedFile} aria-label="Playback position"
              />
            </div>

            {/* Bottom HUD */}
            <div className="crt-bottom-hud">
              <span className="crt-hud-item"><span className="crt-hud-label">FORMAT</span><span className="crt-hud-val">{audioInfo?.format ?? 'PCM/WAV'}</span></span>
              <span className="crt-hud-item"><span className="crt-hud-label">RATE</span><span className="crt-hud-val">{audioInfo ? `${(audioInfo.sampleRate / 1000).toFixed(1)} kHz` : '—'}</span></span>
              <span className="crt-hud-item"><span className="crt-hud-label">STATUS</span><span className="crt-hud-val">{isAnalyzing ? 'SCANNING' : hasLoadedFile ? 'READY' : 'STANDBY'}</span></span>
              <span className="crt-hud-item"><span className="crt-hud-label">DUR</span><span className="crt-hud-val">{audioInfo ? formatTime(audioInfo.duration) : '—'}</span></span>
            </div>

            {/* CRT overlays */}
            <div className="crt-scanlines" aria-hidden="true"></div>
            <div className="crt-vignette" aria-hidden="true"></div>
            <div className="crt-glitch" aria-hidden="true"></div>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="crt-mode-tabs">
          <button className={`hw-mode-tab ${activeMode === 'waveform' ? 'active' : ''}`} onClick={() => setActiveMode('waveform')}>WAVEFORM</button>
          <button className={`hw-mode-tab ${activeMode === 'spectrum' ? 'active' : ''}`} onClick={() => setActiveMode('spectrum')}>SPECTRUM</button>
          <button className={`hw-mode-tab ${activeMode === 'phase' ? 'active' : ''}`} onClick={() => setActiveMode('phase')}>PHASE</button>
        </div>
      </section>

      {/* ── CONTROLS SECTION (LOWER) ── */}
      <section className="hw-controls-section">

        {/* Left: tape slot + transport */}
        <div className="hw-controls-left">
          <div className="hw-tape-slot-wrap">
            <div className="hw-slot-label">INSERT MEDIA</div>
            <input type="file" accept="audio/*" id="deck-file-input"
              className="deck-file-input" onChange={handleFileInput}
              disabled={hasLoadedFile || isAnalyzing}
            />
            <label
              htmlFor="deck-file-input"
              className={`hw-tape-slot ${hasLoadedFile ? 'loaded' : ''} ${isAnalyzing ? 'disabled' : ''} ${isTapeLoading ? 'loading' : ''}`}
            >
              <div className="hw-tape-rollers">
                <div className="hw-tape-roller"></div>
                <div className="hw-tape-roller"></div>
              </div>
              <span className="hw-tape-label-text">
                {hasLoadedFile ? (fileName ?? 'MEDIA LOADED') : '▸ CLICK OR DROP'}
              </span>
            </label>
          </div>

          <div className="hw-transport">
            <button className="hw-btn hw-btn-stop" onClick={handleStop} disabled={!hasLoadedFile}>
              <span className="hw-btn-led hw-led-red"></span>
              <span className="hw-btn-label">STOP</span>
            </button>
            <button className={`hw-btn hw-btn-loop ${isLooping ? 'active' : ''}`} onClick={() => setIsLooping(p => !p)} disabled={!hasLoadedFile}>
              <span className="hw-btn-label">LOOP</span>
            </button>
            <button className={`hw-btn hw-btn-play ${isPlaying ? 'active' : ''}`} onClick={isPlaying ? handlePause : handlePlay} disabled={!hasLoadedFile}>
              <span className="hw-btn-label">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
            <button className={`hw-btn hw-btn-analyze ${isAnalyzing ? 'active' : ''}`}
              onClick={onStartAnalysis} disabled={!hasLoadedFile || isAnalyzing}
            >
              <span className={`hw-btn-led hw-led-green ${isAnalyzing ? 'on pulse' : ''}`}></span>
              <span className="hw-btn-label">{isAnalyzing ? 'SCANNING' : 'ANALYZE'}</span>
            </button>
          </div>
        </div>

        <div className="hw-controls-divider"></div>

        {/* Right: knobs */}
        <div className="hw-controls-right">
          <div className="hw-knobs-row">
            {/* Gain */}
            <div className="hw-knob-unit">
              <div className="hw-knob-ring">
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <circle className="knob-ring-track" cx="30" cy="30" r={RING_R}
                    strokeDasharray={`${RING_ARC} ${RING_CIRC}`} strokeDashoffset={0} />
                  <circle className={`knob-ring-fill ${hasLoadedFile ? 'active' : ''}`} cx="30" cy="30" r={RING_R}
                    strokeDasharray={`${RING_ARC} ${RING_CIRC}`} strokeDashoffset={ringOffset(knobGain)} />
                </svg>
                <div className={`hw-knob-body deck-rot-a ${isPlaying ? 'spinning' : ''}`}>
                  <div className="hw-knob-indicator"></div>
                </div>
              </div>
              <span className="hw-knob-label">GAIN</span>
              <span className="hw-knob-value">{knobGain}%</span>
            </div>
            {/* EQ */}
            <div className="hw-knob-unit">
              <div className="hw-knob-ring">
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <circle className="knob-ring-track" cx="30" cy="30" r={RING_R}
                    strokeDasharray={`${RING_ARC} ${RING_CIRC}`} strokeDashoffset={0} />
                  <circle className={`knob-ring-fill ${hasLoadedFile ? 'active' : ''}`} cx="30" cy="30" r={RING_R}
                    strokeDasharray={`${RING_ARC} ${RING_CIRC}`} strokeDashoffset={ringOffset(knobEQ)} />
                </svg>
                <div className={`hw-knob-body deck-rot-b ${isPlaying ? 'spinning' : ''}`}>
                  <div className="hw-knob-indicator"></div>
                </div>
              </div>
              <span className="hw-knob-label">EQ</span>
              <span className="hw-knob-value">{knobEQ}%</span>
            </div>
            {/* Level */}
            <div className="hw-knob-unit">
              <div className="hw-knob-ring">
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <circle className="knob-ring-track" cx="30" cy="30" r={RING_R}
                    strokeDasharray={`${RING_ARC} ${RING_CIRC}`} strokeDashoffset={0} />
                  <circle className={`knob-ring-fill ${hasLoadedFile ? 'active' : ''}`} cx="30" cy="30" r={RING_R}
                    strokeDasharray={`${RING_ARC} ${RING_CIRC}`} strokeDashoffset={ringOffset(knobLevel)} />
                </svg>
                <div className={`hw-knob-body deck-rot-c ${isPlaying ? 'spinning' : ''}`}>
                  <div className="hw-knob-indicator"></div>
                </div>
              </div>
              <span className="hw-knob-label">LEVEL</span>
              <span className="hw-knob-value">{knobLevel}%</span>
            </div>
          </div>
        </div>
      </section>

      <div className="hw-footer-strip">
        <span>S/N: 8402-THX-4</span>
        <span>MIXFIX AI AUDIO ANALYZER v5.0</span>
        <span>MANUFACTURED IN OSAKA</span>
      </div>
    </div>
  )
}

export default Dashboard
