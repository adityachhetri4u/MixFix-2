import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LandingPage.css'

/* ─────────────────────────────────────────
   CRT TERMINAL — text-based screen content
   ───────────────────────────────────────── */
function CRTTerminal({ type = 'boot' }: { type?: 'boot' | 'analysis' }) {
  const bootLines = [
    { text: 'MIXFIX OS v2.1 — AI AUDIO ENGINE', cls: 'ln-header' },
    { text: '────────────────────────────────────', cls: 'ln-div' },
    { text: 'INIT: SIGNAL PROCESSOR.........  OK', cls: 'ln-ok' },
    { text: 'INIT: FFT MODULE (2048 buf)......  OK', cls: 'ln-ok' },
    { text: 'INIT: WAVEFORM RENDERER..........  OK', cls: 'ln-ok' },
    { text: 'INIT: AI INFERENCE ENGINE........  OK', cls: 'ln-ok' },
    { text: '────────────────────────────────────', cls: 'ln-div' },
    { text: 'SAMPLE RATE   >  44100 Hz', cls: 'ln-val' },
    { text: 'BIT DEPTH     >  24-bit / FLOAT32', cls: 'ln-val' },
    { text: 'CHANNELS      >  STEREO', cls: 'ln-val' },
    { text: 'LATENCY       >  <3 ms', cls: 'ln-val' },
    { text: '────────────────────────────────────', cls: 'ln-div' },
    { text: 'STATUS: STANDBY — INSERT MEDIA', cls: 'ln-status' },
    { text: '', cls: '' },
    { text: '▸ DRAG & DROP OR CLICK TO LOAD', cls: 'ln-prompt' },
  ]

  const analysisLines = [
    { text: 'MIXFIX ANALYSIS MODULE — ACTIVE', cls: 'ln-header' },
    { text: '────────────────────────────────────', cls: 'ln-div' },
    { text: 'FREQ SCAN      20 Hz – 20 kHz', cls: 'ln-val' },
    { text: 'PEAK LEVEL     -3.2 dBFS', cls: 'ln-val' },
    { text: 'RMS LEVEL      -18.4 dBFS', cls: 'ln-val' },
    { text: 'DYNAMIC RANGE  14.2 dB', cls: 'ln-val' },
    { text: 'NOISE FLOOR    -64.5 dBFS', cls: 'ln-val' },
    { text: '────────────────────────────────────', cls: 'ln-div' },
    { text: 'WAVEFORM  [████████████░░░░░░░░] 64%', cls: 'ln-bar' },
    { text: 'SPECTRUM  [█████████░░░░░░░░░░░] 48%', cls: 'ln-bar' },
    { text: 'PHASE     [████████████████░░░░] 82%', cls: 'ln-bar' },
    { text: '────────────────────────────────────', cls: 'ln-div' },
    { text: 'CLIPPING:    NONE DETECTED', cls: 'ln-ok' },
    { text: 'STATUS:      ANALYSIS READY', cls: 'ln-status' },
    { text: '', cls: '' },
  ]

  const lines = type === 'analysis' ? analysisLines : bootLines

  return (
    <div className="lp-crt-terminal">
      {/* top bar with LEDs */}
      <div className="lp-term-topbar">
        <div className="lp-term-leds">
          <span className="lp-led-dot green on" />
          <span className="lp-led-dot red" />
          <span className="lp-led-dot amber on" />
        </div>
        <span className="lp-term-title">MIXFIX::CONSOLE</span>
        <span className="lp-term-badge">LIVE</span>
      </div>

      {/* screen body */}
      <div className="lp-term-screen">
        <div className="lp-term-lines">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`lp-term-line ${l.cls}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {l.text || '\u00A0'}
            </div>
          ))}
          <div className="lp-term-line lp-term-cursor">
            <span className="lp-cursor-block">█</span>
          </div>
        </div>

        {/* overlays */}
        <div className="lp-crt-scanlines" aria-hidden="true" />
        <div className="lp-crt-vignette" aria-hidden="true" />
        <div className="lp-crt-glitch" aria-hidden="true" />
      </div>

      {/* bottom HUD strip */}
      <div className="lp-term-hud">
        <span><span className="lp-hud-label">FORMAT</span><span className="lp-hud-val">PCM/WAV</span></span>
        <span><span className="lp-hud-label">RATE</span><span className="lp-hud-val">44.1 kHz</span></span>
        <span><span className="lp-hud-label">STATUS</span><span className="lp-hud-val">{type === 'analysis' ? 'SCANNING' : 'STANDBY'}</span></span>
        <span><span className="lp-hud-label">CHANNEL</span><span className="lp-hud-val">STEREO</span></span>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Fade-in on scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="lp-root">

      {/* ══════════════ NAV ══════════════ */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-nav-brand">
            <span className="lp-nav-logo">MixFix</span>
            <span className="lp-nav-brand-sub">v2.1</span>
          </div>
          <div className="lp-nav-links">
            <a href="#features" className="lp-nav-link">Features</a>
            <a href="#how-it-works" className="lp-nav-link">How It Works</a>
            <a href="#preview" className="lp-nav-link">Console</a>
          </div>
          <button className="lp-btn lp-btn-outline lp-nav-cta" onClick={() => navigate('/app')}>
            Launch App <span className="lp-btn-arrow">→</span>
          </button>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          {/* Left */}
          <div className="lp-hero-copy fade-up">
            <div className="lp-hero-eyebrow">
              <span className="lp-led-dot green on" />
              <span className="lp-led-dot red pulse" />
              SYSTEM ONLINE — AI AUDIO INTELLIGENCE
            </div>
            <h1 className="lp-hero-heading">
              MIXFIX<span className="lp-accent-dot">.</span>
            </h1>
            <p className="lp-hero-tagline">
              AI-Powered Audio Analysis<br />for Modern Producers
            </p>
            <p className="lp-hero-desc">
              Upload. Analyze. Refine. MixFix uses intelligent signal processing to give you
              professional-grade insight into every layer of your audio — from noise floor to
              dynamic range.
            </p>
            <div className="lp-hero-ctas">
              <button className="lp-btn lp-btn-primary" onClick={() => navigate('/app')}>
                Analyse Now
                <span className="lp-btn-arrow">→</span>
              </button>
            </div>
            <div className="lp-hero-stats">
              <div className="lp-stat">
                <span className="lp-stat-val">44.1k</span>
                <span className="lp-stat-label">Sample Rate</span>
              </div>
              <div className="lp-stat-divider" />
              <div className="lp-stat">
                <span className="lp-stat-val">3–4</span>
                <span className="lp-stat-label">Analysis Modes</span>
              </div>
              <div className="lp-stat-divider" />
              <div className="lp-stat">
                <span className="lp-stat-val">AI</span>
                <span className="lp-stat-label">Signal Engine</span>
              </div>
            </div>
          </div>

          {/* Right — hardware console with terminal */}
          <div className="lp-hero-visual fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="lp-hw-frame">
              <div className="lp-hw-top-bar">
                <div className="lp-hw-brand">
                  <span className="lp-hw-brand-name">MixFix</span>
                  <span className="lp-hw-brand-sub">AI AUDIO ANALYSIS SYSTEM · MODEL 8402</span>
                </div>
                <div className="lp-hw-leds">
                  <div className="lp-hw-led-g"><span className="lp-led-dot green on" /><span>PWR</span></div>
                  <div className="lp-hw-led-g"><span className="lp-led-dot red pulse" /><span>SCAN</span></div>
                  <div className="lp-hw-led-g"><span className="lp-led-dot amber on" /><span>PLAY</span></div>
                </div>
              </div>
              <div className="lp-hw-bezel">
                <CRTTerminal type="boot" />
              </div>
              <div className="lp-hw-controls-strip">
                <div className="lp-hw-mini-btn red" title="STOP" />
                <div className="lp-hw-mini-btn grey" title="REWIND" />
                <div className="lp-hw-mini-btn grey active" title="PLAY" />
                <div className="lp-hw-mini-btn grey" title="ANALYZE" />
                <div className="lp-hw-knob-row">
                  <div className="lp-hw-knob-wrap">
                    <div className="lp-hw-knob" />
                    <span className="lp-hw-knob-label">GAIN</span>
                  </div>
                  <div className="lp-hw-knob-wrap">
                    <div className="lp-hw-knob" />
                    <span className="lp-hw-knob-label">EQ</span>
                  </div>
                  <div className="lp-hw-knob-wrap">
                    <div className="lp-hw-knob" />
                    <span className="lp-hw-knob-label">LVL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="lp-section lp-section-mid" id="features">
        <div className="lp-section-inner">
          <div className="lp-section-header fade-up">
            <span className="lp-eyebrow">// CAPABILITIES</span>
            <h2 className="lp-section-title">Built for precision. Designed for clarity.</h2>
            <p className="lp-section-sub">
              Every module in MixFix is engineered to give you a deeper read on your audio signal.
            </p>
          </div>
          <div className="lp-features-grid">
            {[
              { code: 'MOD_01', icon: '⬡', title: 'AI Signal Analysis', desc: 'Real-time waveform and frequency breakdown powered by intelligent models trained on professional audio.' },
              { code: 'MOD_02', icon: '▣', title: 'Hardware Interface', desc: 'Industrial console design with tactile control system — built to feel as precise as the tools it emulates.' },
              { code: 'MOD_03', icon: '◈', title: 'Multi-Mode Visualization', desc: 'Switch between Waveform, Spectrum, and Phase analysis modes for complete signal coverage.' },
              { code: 'MOD_04', icon: '◎', title: 'Precision Controls', desc: 'Gain, EQ, and Level adjustments with knob feedback and live numeric readouts.' },
            ].map((f, i) => (
              <div className="lp-feature-card fade-up" style={{ animationDelay: `${i * 0.08}s` }} key={f.code}>
                <div className="lp-feature-card-header">
                  <span className="lp-feature-code">{f.code}</span>
                  <span className="lp-feature-icon">{f.icon}</span>
                </div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
                <div className="lp-feature-accent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="lp-section lp-section-dark" id="how-it-works">
        <div className="lp-section-inner">
          <div className="lp-section-header fade-up">
            <span className="lp-eyebrow">// WORKFLOW</span>
            <h2 className="lp-section-title">Three steps to clarity.</h2>
          </div>
          <div className="lp-steps-row">
            {[
              { num: '01', icon: '⬇', title: 'INSERT MEDIA', desc: 'Drop or select any audio file. MixFix accepts WAV, MP3, AIFF and most common formats.' },
              { num: '02', icon: '⚙', title: 'ANALYZE SIGNAL', desc: 'The AI engine scans your audio — evaluating waveform, dynamic range, noise floor, and more.' },
              { num: '03', icon: '✦', title: 'OPTIMIZE SOUND', desc: 'Review per-issue findings and use precision controls to refine your mix with full insight.' },
            ].map((step, i) => (
              <div className="lp-step fade-up" style={{ animationDelay: `${i * 0.1}s` }} key={step.num}>
                <div className="lp-step-numbar">
                  <span className="lp-step-num">{step.num}</span>
                  <div className="lp-step-num-line" />
                </div>
                <div className="lp-step-icon">{step.icon}</div>
                <h3 className="lp-step-title">{step.title}</h3>
                <p className="lp-step-desc">{step.desc}</p>
                {i < 2 && <div className="lp-step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CONSOLE PREVIEW ══════════════ */}
      <section className="lp-section" id="preview">
        <div className="lp-section-inner">
          <div className="lp-section-header fade-up">
            <span className="lp-eyebrow">// LIVE CONSOLE</span>
            <h2 className="lp-section-title">See Your Signal in Real Time</h2>
            <p className="lp-section-sub">
              MixFix reads your audio at every frequency band — surfacing problems that ears alone would miss.
            </p>
          </div>
          <div className="lp-preview-frame fade-up">
            <div className="lp-preview-console">
              <div className="lp-hw-top-bar">
                <div className="lp-hw-brand">
                  <span className="lp-hw-brand-name">MixFix</span>
                  <span className="lp-hw-brand-sub">ANALYSIS CONSOLE · DEMO MODE</span>
                </div>
                <div className="lp-hw-leds">
                  <div className="lp-hw-led-g"><span className="lp-led-dot green on" /><span>PWR</span></div>
                  <div className="lp-hw-led-g"><span className="lp-led-dot red on pulse" /><span>SCAN</span></div>
                  <div className="lp-hw-led-g"><span className="lp-led-dot amber on" /><span>PLAY</span></div>
                </div>
              </div>
              <div className="lp-hw-bezel lp-preview-bezel">
                <CRTTerminal type="analysis" />
              </div>
              <div className="lp-hw-controls-strip lp-preview-strip">
                <div className="lp-hw-mini-btn red" />
                <div className="lp-hw-mini-btn grey active" />
                <div className="lp-hw-mini-btn grey" />
                <div className="lp-preview-mode-tabs">
                  <span className="lp-preview-tab active">WAVEFORM</span>
                  <span className="lp-preview-tab">SPECTRUM</span>
                  <span className="lp-preview-tab">PHASE</span>
                </div>
                <div className="lp-hw-knob-row" style={{ marginLeft: 'auto' }}>
                  <div className="lp-hw-knob-wrap"><div className="lp-hw-knob" /><span className="lp-hw-knob-label">GAIN</span></div>
                  <div className="lp-hw-knob-wrap"><div className="lp-hw-knob" /><span className="lp-hw-knob-label">EQ</span></div>
                  <div className="lp-hw-knob-wrap"><div className="lp-hw-knob" /><span className="lp-hw-knob-label">LVL</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY MIXFIX ══════════════ */}
      <section className="lp-section lp-section-dark">
        <div className="lp-section-inner lp-why-inner">
          <div className="lp-why-left fade-up">
            <span className="lp-eyebrow">// PHILOSOPHY</span>
            <h2 className="lp-section-title">Why MixFix?</h2>
            <p className="lp-why-body">
              Built for creators who care about clarity. MixFix blends classic hardware inspiration
              with modern AI analysis to deliver precision, insight, and control.
            </p>
            <p className="lp-why-body">
              Whether you're mastering a final track, debugging a problematic mix, or just learning
              the craft — MixFix gives you the professional data you need to make better decisions.
            </p>
            <button className="lp-btn lp-btn-primary" onClick={() => navigate('/app')}>
              Analyse Now <span className="lp-btn-arrow">→</span>
            </button>
          </div>
          <div className="lp-why-right fade-up" style={{ animationDelay: '0.1s' }}>
            {[
              ['INTELLIGENT DETECTION', 'Identifies clipping, noise floor issues, and dynamic range compression automatically.'],
              ['NO DAW REQUIRED', 'Works entirely in your browser — no plugins, no installs, no latency.'],
              ['OPEN & TRANSPARENT', 'Built in public. Feedback-driven development. Community-informed features.'],
            ].map(([title, desc]) => (
              <div className="lp-why-item" key={title}>
                <div className="lp-why-check">✓</div>
                <div>
                  <div className="lp-why-item-title">{title}</div>
                  <div className="lp-why-item-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="lp-cta-section fade-up">
        <div className="lp-cta-inner">
          <div className="lp-cta-led-row">
            <span className="lp-led-dot green on pulse" />
            <span className="lp-led-dot green on pulse" style={{ animationDelay: '0.3s' }} />
            <span className="lp-led-dot green on pulse" style={{ animationDelay: '0.6s' }} />
          </div>
          <div className="lp-cta-console-line">SYSTEM READY — AWAITING INPUT</div>
          <h2 className="lp-cta-heading">Upgrade Your Audio Workflow</h2>
          <p className="lp-cta-sub">
            Join the next generation of producers using AI signal intelligence.
          </p>
          <button className="lp-btn lp-btn-cta" onClick={() => navigate('/app')}>
            Start Analysing Now
          </button>
          <p className="lp-cta-note">No account required. Works in-browser. Free to use.</p>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <span className="lp-nav-logo">MixFix</span>
            <span className="lp-footer-tagline">AI Audio Analysis Platform · S/N: 8402-THX-4</span>
          </div>
          <div className="lp-footer-links-col">
            <span className="lp-footer-col-title">// PRODUCT</span>
            <button className="lp-footer-link" onClick={() => navigate('/app')}>Launch App</button>
            <a href="#features" className="lp-footer-link">Features</a>
            <a href="#how-it-works" className="lp-footer-link">How It Works</a>
          </div>
          <div className="lp-footer-links-col">
            <span className="lp-footer-col-title">// INFO</span>
            <button className="lp-footer-link">Privacy</button>
            <button className="lp-footer-link">Terms</button>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2026 MixFix · Built with precision.</span>
          <span className="lp-footer-serial">S/N: 8402-THX-4 · OSAKA</span>
        </div>
      </footer>

    </div>
  )
}
