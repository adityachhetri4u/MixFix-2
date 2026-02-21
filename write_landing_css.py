import pathlib
css = r"""/* LandingPage.css — MixFix v6 Landing */

/* ═══════════════════════════════════════════
   ROOT / TOKENS
   ═══════════════════════════════════════════ */

.lp-root {
  --lp-bg:      #1A1D20;
  --lp-surf:    #2B2F34;
  --lp-surf2:   #3A3F45;
  --lp-surf3:   #444A51;
  --lp-border:  #3A3F45;
  --lp-border2: #4A5058;
  --lp-green:   #00F5A0;
  --lp-green-s: #1DB954;
  --lp-green-d: rgba(0,245,160,0.1);
  --lp-text:    #E6EDF3;
  --lp-text2:   #9BA1A6;
  --lp-text3:   #5A6168;

  background: var(--lp-bg);
  color: var(--lp-text);
  font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */

.lp-nav {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(26,29,32,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--lp-border);
}

.lp-nav-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.lp-nav-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--lp-text);
  text-transform: uppercase;
  flex-shrink: 0;
}

.lp-nav-links {
  display: flex;
  gap: 1.6rem;
  flex: 1;
}

.lp-nav-link {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--lp-text2);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.18s;
}

.lp-nav-link:hover { color: var(--lp-text); }

/* ═══════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════ */

.lp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: inherit;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s, color 0.15s, border-color 0.15s;
  padding: 0.6rem 1.3rem;
  border: 1px solid transparent;
  text-decoration: none;
}

.lp-btn:hover { transform: translateY(-1px); }
.lp-btn:active { transform: translateY(0); }

.lp-btn-primary {
  background: var(--lp-green);
  color: #0D1912;
  border-color: var(--lp-green);
}
.lp-btn-primary:hover {
  background: #1dfcac;
  box-shadow: 0 0 20px rgba(0,245,160,0.22), 0 6px 20px rgba(0,0,0,0.3);
}

.lp-btn-outline {
  background: transparent;
  color: var(--lp-text);
  border-color: var(--lp-border2);
}
.lp-btn-outline:hover {
  border-color: var(--lp-text2);
  background: rgba(255,255,255,0.04);
}

.lp-btn-ghost {
  background: transparent;
  color: var(--lp-text2);
  border-color: var(--lp-border);
}
.lp-btn-ghost:hover {
  color: var(--lp-text);
  border-color: var(--lp-border2);
  background: rgba(255,255,255,0.03);
}

.lp-btn-cta {
  background: var(--lp-green);
  color: #0D1912;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.85rem 2.4rem;
  border-radius: 8px;
  border-color: var(--lp-green);
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;
}
.lp-btn-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0);
  transition: background 0.2s;
}
.lp-btn-cta:hover::before { background: rgba(255,255,255,0.1); }
.lp-btn-cta:hover {
  box-shadow: 0 0 28px rgba(0,245,160,0.3), 0 8px 24px rgba(0,0,0,0.3);
}

.lp-btn-arrow { font-style: normal; transition: transform 0.15s; }
.lp-btn:hover .lp-btn-arrow { transform: translateX(3px); }

.lp-nav-cta { padding: 0.45rem 1rem; font-size: 0.8rem; margin-left: auto; }

/* ═══════════════════════════════════════════
   LED DOTS
   ═══════════════════════════════════════════ */

.lp-led-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2A2E33;
  border: 1px solid #1A1D20;
  flex-shrink: 0;
  transition: background 0.2s, box-shadow 0.2s;
  vertical-align: middle;
}

.lp-led-dot.green.on {
  background: var(--lp-green);
  box-shadow: 0 0 6px rgba(0,245,160,0.9), 0 0 14px rgba(0,245,160,0.4);
}
.lp-led-dot.red.on {
  background: #FF4D4D;
  box-shadow: 0 0 6px rgba(255,77,77,0.9), 0 0 14px rgba(255,77,77,0.4);
}
.lp-led-dot.amber.on {
  background: #FFA040;
  box-shadow: 0 0 6px rgba(255,160,64,0.9), 0 0 14px rgba(255,160,64,0.4);
}
.lp-led-dot.pulse { animation: ledPulse 1.4s ease-in-out infinite; }
@keyframes ledPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ═══════════════════════════════════════════
   CRT SCREEN COMPONENT
   ═══════════════════════════════════════════ */

.lp-crt-screen {
  background: #061A12;
  border-radius: 6px;
  padding: 0.75rem;
  height: var(--screen-height, 180px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border: 1px solid #0D2E1E;
  box-shadow:
    inset 0 0 40px rgba(0,0,0,0.8),
    0 0 4px rgba(0,245,160,0.05);
  animation: crtFlicker 14s ease-in-out infinite;
}

@keyframes crtFlicker {
  0%, 88%, 100% { opacity: 1; }
  89% { opacity: 0.97; }
  90% { opacity: 1; }
  93% { opacity: 0.965; }
  94% { opacity: 1; }
}

.lp-crt-statusbar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.56rem;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(0,245,160,0.09);
  padding-bottom: 0.3rem;
  flex-shrink: 0;
}

.lp-crt-status-text {
  color: rgba(168,255,216,0.75);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lp-crt-badge {
  background: rgba(0,245,160,0.12);
  color: #00F5A0;
  border: 1px solid rgba(0,245,160,0.2);
  border-radius: 3px;
  padding: 0 0.4rem;
  font-size: 0.48rem;
  letter-spacing: 0.14em;
  animation: badgeBlink 2s step-start infinite;
}
@keyframes badgeBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.lp-crt-time {
  color: rgba(168,255,216,0.4);
  font-size: 0.52rem;
  flex-shrink: 0;
}

.lp-crt-waveform {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  padding: 0 1px;
  min-height: 0;
}

.lp-crt-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent calc(25% - 0.5px),
    rgba(0,245,160,0.06) calc(25% - 0.5px),
    rgba(0,245,160,0.06) 25%
  );
}

.lp-crt-centerline {
  position: absolute;
  left: 0; right: 0;
  bottom: 50%;
  height: 1px;
  background: rgba(0,245,160,0.15);
  pointer-events: none;
}

.lp-crt-bar {
  flex: 1;
  background: rgba(0,245,160,0.52);
  border-radius: 2px 2px 0 0;
  min-width: 2px;
  align-self: flex-end;
  transform-origin: bottom;
  transition: height 0.2s ease-in-out;
}

.lp-crt-bar.peak {
  background: #00F5A0;
  box-shadow: 0 0 5px rgba(0,245,160,0.55), 0 -2px 6px rgba(0,245,160,0.25);
}

.lp-crt-bar.animate {
  animation: barPulse 0.45s ease-in-out infinite alternate;
}
.lp-crt-bar.animate:nth-child(odd)  { animation-duration: 0.38s; }
.lp-crt-bar.animate:nth-child(3n)   { animation-duration: 0.52s; }
.lp-crt-bar.animate:nth-child(4n)   { animation-duration: 0.33s; }
.lp-crt-bar.animate:nth-child(5n)   { animation-duration: 0.60s; }

@keyframes barPulse {
  from { transform: scaleY(0.48); }
  to   { transform: scaleY(1.04); }
}

.lp-crt-hud {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
  padding-top: 0.25rem;
  border-top: 1px solid rgba(0,245,160,0.07);
  font-family: 'IBM Plex Mono', monospace;
  flex-wrap: wrap;
}

.lp-hud-label {
  font-size: 0.48rem;
  letter-spacing: 0.14em;
  color: rgba(168,255,216,0.3);
  margin-right: 0.3rem;
}

.lp-hud-val {
  font-size: 0.56rem;
  letter-spacing: 0.08em;
  color: rgba(168,255,216,0.75);
}

/* CRT Overlays */
.lp-crt-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px,
    transparent 1px, transparent 3px
  );
  pointer-events: none;
  border-radius: inherit;
  animation: scanScroll 9s linear infinite;
  opacity: 0.65;
}
@keyframes scanScroll {
  from { background-position: 0 0; }
  to   { background-position: 0 -48px; }
}

.lp-crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 52%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.7) 100%
  );
  pointer-events: none;
  border-radius: inherit;
}

.lp-crt-glitch {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  animation: crtGlitch 18s steps(1) infinite;
}
@keyframes crtGlitch {
  0%, 86%, 100% { opacity: 0; transform: none; filter: none; background: none; }
  87% {
    opacity: 1;
    transform: translate(-2px, 0);
    background: linear-gradient(transparent 30%, rgba(0,245,160,0.05) 30%, rgba(0,245,160,0.05) 36%, transparent 36%);
    filter: hue-rotate(12deg);
  }
  88% {
    transform: translate(2px, 0);
    background: linear-gradient(transparent 62%, rgba(0,245,160,0.04) 62%, rgba(0,245,160,0.04) 67%, transparent 67%);
    filter: hue-rotate(-8deg);
  }
  89% { opacity: 0; }
}

/* ═══════════════════════════════════════════
   SCROLL FADE-IN
   ═══════════════════════════════════════════ */

.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

.lp-hero {
  background: linear-gradient(180deg, #1E2228 0%, #1A1D20 100%);
  border-bottom: 1px solid var(--lp-border);
  padding: 5rem 2rem 5rem;
}

.lp-hero-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.lp-hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--lp-green);
  margin-bottom: 1rem;
}

.lp-hero-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--lp-text);
  margin: 0 0 1rem;
  line-height: 1;
}

.lp-accent-dot {
  color: var(--lp-green);
}

.lp-hero-tagline {
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  font-weight: 500;
  color: var(--lp-text2);
  margin: 0 0 1.2rem;
  line-height: 1.45;
}

.lp-hero-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--lp-text3);
  margin: 0 0 2rem;
  max-width: 480px;
}

.lp-hero-ctas {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.lp-hero-stats {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.lp-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lp-stat-val {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--lp-text);
  letter-spacing: -0.01em;
}

.lp-stat-label {
  font-size: 0.68rem;
  color: var(--lp-text3);
  letter-spacing: 0.04em;
}

.lp-stat-divider {
  width: 1px;
  height: 32px;
  background: var(--lp-border);
}

/* ── Hero hardware frame ── */
.lp-hero-visual {
  display: flex;
  justify-content: center;
}

.lp-hw-frame {
  width: 100%;
  max-width: 480px;
  background: #2B2F34;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.05) inset,
    0 -2px 0 rgba(0,0,0,0.5) inset,
    0 20px 60px rgba(0,0,0,0.6),
    0 4px 16px rgba(0,0,0,0.3);
  border: 1px solid #1A1D20;
}

.lp-hw-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 1rem;
  background: linear-gradient(180deg, #3E4349 0%, #363B41 100%);
  border-bottom: 1px solid #1E2124;
}

.lp-hw-brand {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.lp-hw-brand-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #C8CDD4;
  text-transform: uppercase;
}

.lp-hw-brand-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.44rem;
  letter-spacing: 0.14em;
  color: #5A616A;
  text-transform: uppercase;
}

.lp-hw-leds {
  display: flex;
  gap: 0.9rem;
}

.lp-hw-led-g {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.38rem;
  letter-spacing: 0.1em;
  color: #5A616A;
}

.lp-hw-bezel {
  background: #1E2124;
  padding: 8px;
  border-bottom: 1px solid #1A1D20;
}

.lp-hw-controls-strip {
  display: flex;
  align-items: center;
  padding: 0.65rem 1rem;
  gap: 0.5rem;
  background: linear-gradient(180deg, #33383E 0%, #2E3338 100%);
}

.lp-hw-mini-btn {
  width: 26px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid #4A5058;
  box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 2px 0 #1E2124;
}

.lp-hw-mini-btn.grey { background: linear-gradient(180deg, #4E545C 0%, #3E434A 100%); }
.lp-hw-mini-btn.grey.active { background: linear-gradient(180deg, #2A4035 0%, #1E3028 100%); border-color: rgba(0,245,160,0.25); }
.lp-hw-mini-btn.red  { background: linear-gradient(180deg, #5C3838 0%, #4A2D2D 100%); border-color: rgba(255,77,77,0.3); }

.lp-hw-knob-row {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.lp-hw-knob {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #5E6470, #353A40);
  border: 1px solid #282D33;
  box-shadow: 0 2px 0 rgba(255,255,255,0.08) inset, 0 2px 4px rgba(0,0,0,0.6);
}

/* ═══════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════ */

.lp-section {
  padding: 5rem 2rem;
}

.lp-section-dark {
  background: #1E2124;
  border-top: 1px solid var(--lp-border);
  border-bottom: 1px solid var(--lp-border);
}

.lp-section-inner {
  max-width: 1180px;
  margin: 0 auto;
}

.lp-section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.lp-eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lp-green);
  margin-bottom: 0.8rem;
  font-family: 'IBM Plex Mono', monospace;
}

.lp-section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--lp-text);
  margin: 0 0 1rem;
  line-height: 1.2;
}

.lp-section-sub {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--lp-text3);
  max-width: 560px;
  margin: 0 auto;
}

/* ═══════════════════════════════════════════
   FEATURE CARDS
   ═══════════════════════════════════════════ */

.lp-features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
}

.lp-feature-card {
  background: var(--lp-surf);
  border: 1px solid var(--lp-border);
  border-radius: 10px;
  padding: 1.6rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.lp-feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  border-color: var(--lp-border2);
}

.lp-feature-icon {
  font-size: 1.4rem;
  color: var(--lp-green);
  margin-bottom: 1rem;
  line-height: 1;
}

.lp-feature-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--lp-text);
  margin: 0 0 0.6rem;
  letter-spacing: -0.01em;
}

.lp-feature-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--lp-text2);
  margin: 0;
}

.lp-feature-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, var(--lp-green), transparent);
  opacity: 0;
  transition: opacity 0.2s;
}

.lp-feature-card:hover .lp-feature-accent { opacity: 0.7; }

/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */

.lp-steps-row {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
}

.lp-step {
  flex: 1;
  padding: 2rem 2.5rem 2rem 0;
  position: relative;
}

.lp-step-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--lp-green);
  margin-bottom: 0.8rem;
}

.lp-step-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--lp-surf);
  border: 1px solid var(--lp-border2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: var(--lp-text);
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.lp-step-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--lp-text);
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.lp-step-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--lp-text2);
  margin: 0;
  max-width: 280px;
}

.lp-step-connector {
  position: absolute;
  top: 57px;
  right: 0;
  width: 2.5rem;
  height: 1px;
  background: linear-gradient(90deg, var(--lp-border2), transparent);
}

/* ═══════════════════════════════════════════
   LIVE PREVIEW
   ═══════════════════════════════════════════ */

.lp-preview-frame {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.lp-preview-bezel {
  background: #1E2124;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid var(--lp-border);
  box-shadow: inset 0 4px 12px rgba(0,0,0,0.8), 0 8px 32px rgba(0,0,0,0.4);
}

.lp-preview-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--lp-text3);
}

/* ═══════════════════════════════════════════
   WHY MIXFIX
   ═══════════════════════════════════════════ */

.lp-why-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.lp-why-left { display: flex; flex-direction: column; gap: 1.2rem; }

.lp-why-body {
  font-size: 1rem;
  line-height: 1.72;
  color: var(--lp-text2);
  margin: 0;
}

.lp-why-right {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.lp-why-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.lp-why-check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--lp-green-d);
  border: 1px solid rgba(0,245,160,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--lp-green);
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.lp-why-item-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--lp-text);
  margin-bottom: 0.2rem;
}

.lp-why-item-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--lp-text2);
}

/* ═══════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════ */

.lp-cta-section {
  background: linear-gradient(180deg, #1E2124 0%, #1A1D20 100%);
  border-top: 1px solid var(--lp-border);
  padding: 6rem 2rem;
  text-align: center;
}

.lp-cta-inner {
  max-width: 580px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.lp-cta-led-row {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.lp-cta-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--lp-text);
  margin: 0;
  line-height: 1.1;
}

.lp-cta-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--lp-text3);
  margin: 0;
  max-width: 400px;
}

.lp-cta-note {
  font-size: 0.78rem;
  color: var(--lp-text3);
  margin: 0;
  letter-spacing: 0.02em;
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

.lp-footer {
  background: #1A1D20;
  border-top: 1px solid var(--lp-border);
  padding: 3rem 2rem 1.5rem;
}

.lp-footer-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--lp-border);
  margin-bottom: 1.5rem;
}

.lp-footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.lp-footer-tagline {
  font-size: 0.8rem;
  color: var(--lp-text3);
}

.lp-footer-links-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.lp-footer-col-title {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--lp-text2);
  font-family: 'IBM Plex Mono', monospace;
  margin-bottom: 0.3rem;
}

.lp-footer-link {
  font-size: 0.875rem;
  color: var(--lp-text3);
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  font-family: inherit;
  transition: color 0.15s;
}

.lp-footer-link:hover { color: var(--lp-text); }

.lp-footer-bottom {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: var(--lp-text3);
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.04em;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ═══════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════ */

@media (max-width: 900px) {
  .lp-features-grid { grid-template-columns: repeat(2, 1fr); }
  .lp-hero-inner    { grid-template-columns: 1fr; gap: 2.5rem; }
  .lp-hero { padding: 3.5rem 1.5rem 3rem; }
  .lp-why-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 640px) {
  .lp-features-grid { grid-template-columns: 1fr; }
  .lp-steps-row     { flex-direction: column; gap: 1.5rem; }
  .lp-step-connector { display: none; }
  .lp-step { padding: 0; }
  .lp-footer-inner  { grid-template-columns: 1fr; gap: 2rem; }
  .lp-nav-links     { display: none; }
  .lp-section       { padding: 3.5rem 1.2rem; }
  .lp-hero-stats    { gap: 0.8rem; }
}
"""
pathlib.Path(r'c:\Users\acer\MixFix\src\styles\LandingPage.css').write_text(css, encoding='utf-8')
size = pathlib.Path(r'c:\Users\acer\MixFix\src\styles\LandingPage.css').stat().st_size
print(f"LandingPage.css written: {size} bytes")
