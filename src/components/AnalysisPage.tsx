import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnalysisResults from './AnalysisResults'
import TextType from './TextType'
import '../styles/AnalysisPage.css'

interface AnalysisPageProps {
  data: {
    fileName: string
    rating: number
    issues: Array<{
      type: string
      severity: 'low' | 'medium' | 'high'
      description: string
      timestamp: number
    }>
    waveformData?: number[]
  } | null
  isAnalyzing: boolean
  fileName?: string
  onNewAnalysis: () => void
}

const SCAN_MESSAGES = [
  'INITIALISING SIGNAL PROCESSOR...',
  'LOADING AUDIO BUFFER...',
  'RUNNING FFT TRANSFORM...',
  'SCANNING FOR CLIPPING...',
  'MEASURING DYNAMIC RANGE...',
  'COMPUTING SPECTRAL CENTROID...',
  'ANALYSING ZERO CROSSING RATE...',
  'DETECTING NOISE FLOOR...',
  'RUNNING BEAT DETECTION...',
  'GENERATING DIAGNOSTIC REPORT...',
]

export default function AnalysisPage({ data, isAnalyzing, fileName, onNewAnalysis }: AnalysisPageProps) {
  const navigate = useNavigate()
  // track elapsed seconds for the scan progress label
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isAnalyzing) {
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isAnalyzing])

  const handleNewAnalysis = () => {
    onNewAnalysis()
    navigate('/')
  }

  const highCount = data ? data.issues.filter(i => i.severity === 'high').length : 0
  const hasHighFlags = highCount > 0
  const displayFile = (fileName ?? data?.fileName ?? '').replace(/\.[^.]+$/, '').slice(0, 20).toUpperCase()

  return (
    <main className="ap-container">
      <div className="ap-hw-frame">

        {/* Top bar */}
        <div className="ap-hw-topbar">
          <div className="ap-hw-brand">
            <span className="ap-hw-brand-name">MIXFIX</span>
            <span className="ap-hw-brand-sub">SIGNAL ANALYSIS REPORT — v2.1</span>
          </div>
          <div className="ap-hw-topbar-right">
            <div className="ap-hw-led-group">
              <div className={`ap-led green ${isAnalyzing || data ? 'on' : ''}`} />
              <span className="ap-led-label">{isAnalyzing ? 'SCANNING' : 'ACTIVE'}</span>
            </div>
            <div className="ap-hw-led-group">
              <div className={`ap-led ${isAnalyzing ? 'amber pulse' : hasHighFlags ? 'red' : 'amber'} ${isAnalyzing || data ? 'on' : ''}`} />
              <span className="ap-led-label">{isAnalyzing ? `${elapsed}s` : data ? `${data.issues.length} FLAGS` : 'STANDBY'}</span>
            </div>
          </div>
        </div>

        {/* Bezel + CRT */}
        <div className="ap-bezel">
          <div className={`ap-crt-screen ${isAnalyzing ? 'scanning' : ''}`}>

            {/* Window chrome */}
            <div className="ap-crt-topbar">
              <div className="ap-crt-leds">
                <span className="ap-crt-led g" />
                <span className="ap-crt-led r" />
                <span className="ap-crt-led y" />
              </div>
              <span className="ap-crt-title">ANALYSIS_REPORT.LOG — SIGNAL DIAGNOSTIC</span>
              <span className={`ap-crt-badge ${isAnalyzing ? 'scanning' : ''}`}>
                {isAnalyzing ? 'SCANNING' : data ? 'COMPLETE' : 'STANDBY'}
              </span>
            </div>

            {/* Scrollable body */}
            <div className="ap-crt-body">
              {isAnalyzing ? (
                /* ── SCANNING STATE ── */
                <div className="ap-term-lines">
                  <div className="ap-tl ln-header">MIXFIX OS v2.1 — SIGNAL ANALYSIS ENGINE</div>
                  <div className="ap-tl ln-div">{'═'.repeat(56)}</div>
                  {displayFile && <div className="ap-tl ln-val">{'  '}TARGET    {displayFile}</div>}
                  <div className="ap-tl ln-div">&nbsp;</div>

                  {/* Cycling scan message */}
                  <TextType
                    as="div"
                    text={SCAN_MESSAGES}
                    className="ap-tl ln-header ap-scan-msg"
                    typingSpeed={30}
                    deletingSpeed={14}
                    pauseDuration={700}
                    loop
                    showCursor
                    cursorCharacter="_"
                  />

                  {/* Scan progress bar */}
                  <div className="ap-tl ln-div">&nbsp;</div>
                  <div className="ap-scan-bar-wrap">
                    <div className="ap-scan-bar" key={isAnalyzing ? 'scanning' : 'idle'} />
                  </div>
                  <div className="ap-tl ln-val ap-scan-elapsed">  ELAPSED: {elapsed}s  —  PLEASE WAIT</div>

                  <div className="ap-tl ln-div">&nbsp;</div>
                  <div className="ap-tl ln-val">  DO NOT REMOVE MEDIA DURING ANALYSIS</div>
                  <div className="ap-tl ln-div">{'─'.repeat(56)}</div>

                  {/* Scrolling scan line overlay */}
                  <div className="ap-scan-sweep" />
                </div>
              ) : data ? (
                /* ── RESULTS STATE ── */
                <AnalysisResults data={data} />
              ) : (
                /* ── EMPTY STATE ── */
                <div className="ap-term-lines">
                  <div className="ap-tl ln-header">MIXFIX OS v2.1 — ANALYSIS MODULE</div>
                  <div className="ap-tl ln-div">{'═'.repeat(56)}</div>
                  <div className="ap-tl ln-err">ERROR: NO ANALYSIS DATA LOADED</div>
                  <div className="ap-tl ln-val">{'  '}Return to DECK and load an audio file.</div>
                  <div className="ap-tl ln-div">&nbsp;</div>
                  <div className="ap-tl ln-prompt">▸ AWAITING INPUT<span className="ap-cursor">█</span></div>
                </div>
              )}
              <div className="ap-crt-scanlines" />
              <div className="ap-crt-vignette" />
              <div className="ap-crt-glitch" />
            </div>

            {/* HUD strip */}
            <div className="ap-crt-hud">
              <span><span className="ap-hud-l">FILE</span><span className="ap-hud-v">{displayFile || '—'}</span></span>
              <span><span className="ap-hud-l">SCORE</span><span className="ap-hud-v">{data && !isAnalyzing ? `${data.rating}/100` : '—'}</span></span>
              <span><span className="ap-hud-l">FLAGS</span><span className="ap-hud-v">{data && !isAnalyzing ? data.issues.length : '—'}</span></span>
              <span><span className="ap-hud-l">STATUS</span><span className="ap-hud-v">{isAnalyzing ? 'SCANNING' : data ? 'COMPLETE' : 'STANDBY'}</span></span>
            </div>
          </div>
        </div>

        {/* Controls strip */}
        <div className="ap-controls-strip">
          <div className={`ap-ctrl-btn ${isAnalyzing ? 'red active' : 'grey'}`} />
          <div className={`ap-ctrl-btn grey ${!isAnalyzing ? 'active' : ''}`} />
          <div className="ap-ctrl-btn red" />
          <span className="ap-ctrl-spacer" />
          <span className="ap-ctrl-label">{isAnalyzing ? 'MODE: ACTIVE SCAN' : 'MODE: DIAGNOSTIC REPORT'}</span>
          <span className="ap-ctrl-spacer" />
          <div className="ap-knob-wrap"><div className="ap-knob" /><span className="ap-knob-label">LEVEL</span></div>
          <div className="ap-knob-wrap"><div className="ap-knob" /><span className="ap-knob-label">ZOOM</span></div>
        </div>

        {/* Action bar */}
        <div className="ap-action-bar">
          <button className="ap-action-btn primary" onClick={handleNewAnalysis} disabled={isAnalyzing}>⟳ NEW ANALYSIS</button>
          <button className="ap-action-btn" disabled={!data || isAnalyzing}>↓ EXPORT REPORT</button>
          <span className="ap-action-spacer" />
          <button className="ap-action-btn" onClick={() => navigate('/app')}>← BACK TO DECK</button>
        </div>

      </div>
    </main>
  )
}
