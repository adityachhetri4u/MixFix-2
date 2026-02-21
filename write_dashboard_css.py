import pathlib

css = r"""/* Dashboard.css — MixFix v6 — Industrial CRT Hardware Console */

/* ═════════════════════════════════════════════════════════════
   HARDWARE BODY
   ═════════════════════════════════════════════════════════════ */

.hardware-console {
  background: #2B2F34;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.06) inset,
    0 -2px 0 rgba(0,0,0,0.5) inset,
    0 24px 60px rgba(0,0,0,0.7),
    0 4px 20px rgba(0,0,0,0.4);
  border: 1px solid #1A1D20;
  position: relative;
  font-family: 'IBM Plex Mono', monospace;
}

.hardware-console * { box-sizing: border-box; }

/* ── TOP BAR ── */
.hw-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.2rem;
  background: linear-gradient(180deg, #3E4349 0%, #363B41 100%);
  border-bottom: 2px solid #1E2124;
  box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset;
}

.hw-brand {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
}

.hw-brand-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #C8CDD4;
  text-transform: uppercase;
}

.hw-brand-sub {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: #5A616A;
  text-transform: uppercase;
}

.hw-top-indicators {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.hw-led-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.hw-led-label {
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  color: #5A616A;
  text-transform: uppercase;
}

/* LED dots */
.hw-led-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2A2E33;
  border: 1px solid #1E2124;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.7);
  transition: background 0.25s, box-shadow 0.25s;
}

.hw-led-dot.hw-led-green.on {
  background: #00F5A0;
  box-shadow: 0 0 6px rgba(0,245,160,0.9), 0 0 14px rgba(0,245,160,0.4), inset 0 1px 0 rgba(255,255,255,0.3);
}

.hw-led-dot.hw-led-red.on {
  background: #FF4D4D;
  box-shadow: 0 0 6px rgba(255,77,77,0.9), 0 0 14px rgba(255,77,77,0.4), inset 0 1px 0 rgba(255,255,255,0.3);
}

.hw-led-dot.hw-led-amber.on {
  background: #FFA040;
  box-shadow: 0 0 6px rgba(255,160,64,0.9), 0 0 14px rgba(255,160,64,0.4), inset 0 1px 0 rgba(255,255,255,0.3);
}

.hw-led-dot.pulse {
  animation: ledPulse 0.8s ease-in-out infinite;
}

@keyframes ledPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

/* ═════════════════════════════════════════════════════════════
   CRT SCREEN SECTION (UPPER)
   ═════════════════════════════════════════════════════════════ */

.crt-section {
  background: #2B2F34;
  padding: 1rem 1.2rem 0.6rem;
  border-bottom: 2px solid #1E2124;
}

.crt-bezel {
  background: #1E2124;
  border-radius: 10px;
  padding: 10px;
  box-shadow:
    inset 0 4px 12px rgba(0,0,0,0.9),
    inset 0 -2px 6px rgba(0,0,0,0.6),
    0 2px 0 rgba(255,255,255,0.04);
  border: 1px solid #141618;
}

.crt-screen {
  background: #061A12;
  border-radius: 6px;
  padding: 0.8rem;
  min-height: 240px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid #0D2E1E;
  box-shadow:
    inset 0 0 40px rgba(0,0,0,0.8),
    inset 0 0 80px rgba(0,0,0,0.4),
    0 0 6px rgba(0,245,160,0.06);
  animation: crtFlicker 12s ease-in-out infinite;
}

/* Subtle flicker on the screen */
@keyframes crtFlicker {
  0%,   89%, 100% { opacity: 1; }
  90%  { opacity: 0.975; }
  91%  { opacity: 1; }
  93%  { opacity: 0.96; }
  94%  { opacity: 1; }
  96%  { opacity: 0.985; }
  97%  { opacity: 1; }
}

/* ── Status line ── */
.crt-status-line {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  border-bottom: 1px solid rgba(0,245,160,0.1);
  padding-bottom: 0.4rem;
  flex-wrap: wrap;
}

.crt-status-text {
  color: #A8FFD8;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.crt-mode-badge {
  background: rgba(0,245,160,0.1);
  color: #00F5A0;
  border: 1px solid rgba(0,245,160,0.2);
  border-radius: 3px;
  padding: 0.1rem 0.45rem;
  font-size: 0.55rem;
  letter-spacing: 0.14em;
}

.crt-time {
  color: rgba(168,255,216,0.55);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  flex-shrink: 0;
}

/* ── Waveform area ── */
.crt-waveform-area {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  padding: 0 2px;
  min-height: 100px;
}

/* Horizontal grid lines */
.crt-grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent calc(25% - 0.5px),
      rgba(0,245,160,0.07) calc(25% - 0.5px),
      rgba(0,245,160,0.07) 25%
    );
}

/* Center baseline */
.crt-baseline {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50%;
  height: 1px;
  background: rgba(0,245,160,0.18);
  pointer-events: none;
}

.crt-wave-bar {
  flex: 1;
  background: rgba(0,245,160,0.55);
  border-radius: 2px 2px 0 0;
  min-width: 3px;
  align-self: flex-end;
  transform-origin: bottom;
  transition: height 0.18s ease-in-out;
  position: relative;
}

.crt-wave-bar.peak {
  background: #00F5A0;
  box-shadow: 0 0 6px rgba(0,245,160,0.6), 0 -2px 8px rgba(0,245,160,0.3);
}

.crt-wave-bar.animate {
  animation: crtBarPulse 0.5s ease-in-out infinite alternate;
}

/* stagger the animation so bars don't move together */
.crt-wave-bar.animate:nth-child(odd)  { animation-duration: 0.42s; }
.crt-wave-bar.animate:nth-child(3n)   { animation-duration: 0.55s; }
.crt-wave-bar.animate:nth-child(4n)   { animation-duration: 0.38s; }

@keyframes crtBarPulse {
  from { transform: scaleY(0.55); }
  to   { transform: scaleY(1.05); }
}

/* ── Progress ── */
.crt-progress-wrap {
  position: relative;
  height: 10px;
  margin-top: 0.2rem;
}

.crt-progress-track {
  height: 4px;
  border-radius: 2px;
  background: rgba(0,245,160,0.08);
  border: 1px solid rgba(0,245,160,0.12);
  overflow: hidden;
  margin-top: 3px;
}

.crt-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1DB954, #00F5A0);
  border-radius: 2px;
  transition: width 0.15s linear;
  box-shadow: 0 0 6px rgba(0,245,160,0.4);
}

.crt-progress-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0;
}

.crt-progress-input:disabled { cursor: default; }

/* ── Bottom HUD ── */
.crt-bottom-hud {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  padding-top: 0.3rem;
  border-top: 1px solid rgba(0,245,160,0.08);
  flex-wrap: wrap;
}

.crt-hud-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.crt-hud-label {
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  color: rgba(168,255,216,0.35);
  text-transform: uppercase;
}

.crt-hud-val {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: #A8FFD8;
}

/* ── CRT Overlays ── */

/* Moving scanlines */
.crt-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.22) 0px,
    rgba(0,0,0,0.22) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
  border-radius: inherit;
  animation: scanlineScroll 8s linear infinite;
  opacity: 0.7;
}

@keyframes scanlineScroll {
  from { background-position: 0 0; }
  to   { background-position: 0 -48px; }
}

/* Vignette */
.crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 55%,
    rgba(0,0,0,0.5) 80%,
    rgba(0,0,0,0.75) 100%
  );
  pointer-events: none;
  border-radius: inherit;
}

/* Glitch */
.crt-glitch {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  animation: crtGlitch 15s steps(1) infinite;
  opacity: 0;
}

@keyframes crtGlitch {
  /* runs once every ~15s, most frames: nothing */
  0%  { opacity: 0; }
  88% { opacity: 0; transform: none; }
  89% {
    opacity: 1;
    transform: translate(-2px, 0);
    background: linear-gradient(
      transparent 0%, transparent 33%,
      rgba(0,245,160,0.06) 33%, rgba(0,245,160,0.06) 38%,
      transparent 38%
    );
    filter: hue-rotate(15deg);
  }
  90% {
    transform: translate(3px, 0);
    background: linear-gradient(
      transparent 0%, transparent 60%,
      rgba(0,245,160,0.05) 60%, rgba(0,245,160,0.05) 65%,
      transparent 65%
    );
    filter: hue-rotate(-10deg);
  }
  91% { opacity: 0; transform: none; filter: none; background: none; }
  100%{ opacity: 0; }
}

/* ── Mode tabs ── */
.crt-mode-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.55rem 0;
  justify-content: center;
}

.hw-mode-tab {
  background: #363B41;
  border: 1px solid #4A5058;
  border-radius: 3px;
  color: #6A7280;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  padding: 0.3rem 0.9rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.4) inset;
}

.hw-mode-tab:hover {
  background: #404650;
  color: #A8B0BC;
}

.hw-mode-tab.active {
  background: #1E2124;
  color: #00F5A0;
  border-color: rgba(0,245,160,0.25);
  box-shadow: 0 0 0 1px rgba(0,245,160,0.1) inset, 0 0 8px rgba(0,245,160,0.08);
}

/* ═════════════════════════════════════════════════════════════
   CONTROLS SECTION (LOWER)
   ═════════════════════════════════════════════════════════════ */

.hw-controls-section {
  display: flex;
  align-items: stretch;
  gap: 0;
  padding: 1rem 1.2rem;
  background: linear-gradient(180deg, #33383E 0%, #2E3338 100%);
}

.hw-controls-left {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 1 1 auto;
}

/* ── Tape Slot ── */
.hw-tape-slot-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.hw-slot-label {
  font-size: 0.5rem;
  letter-spacing: 0.18em;
  color: #5A616A;
  text-transform: uppercase;
  padding-left: 2px;
}

.deck-file-input {
  position: absolute;
  width: 0; height: 0;
  opacity: 0; overflow: hidden;
}

.hw-tape-slot {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: #222528;
  border: 1px dashed #4A5058;
  border-radius: 6px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  min-height: 46px;
}

.hw-tape-slot:hover {
  border-color: rgba(0,245,160,0.3);
  background: #252A2F;
}

.hw-tape-slot.loaded {
  border-style: solid;
  border-color: rgba(0,245,160,0.35);
  background: rgba(0,245,160,0.03);
  cursor: default;
}

.hw-tape-slot.disabled { opacity: 0.5; pointer-events: none; }

.hw-tape-slot.loading {
  animation: tapeLoad 0.5s ease-out;
}

@keyframes tapeLoad {
  0%  { transform: scale(0.98); opacity: 0.7; }
  100%{ transform: scale(1); opacity: 1; }
}

.hw-tape-rollers {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.hw-tape-roller {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #4A5058, #272B30);
  border: 1px solid #1A1D20;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06);
}

.hw-tape-label-text {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: #6A7280;
  text-transform: uppercase;
}

.hw-tape-slot.loaded .hw-tape-label-text {
  color: #A8FFD8;
}

/* ── Transport Buttons ── */
.hw-transport {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.hw-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  background: linear-gradient(180deg, #4E545C 0%, #3E434A 100%);
  border: 1px solid #5A616A;
  border-bottom-color: #282C31;
  border-radius: 5px;
  color: #A0A8B4;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.08s, box-shadow 0.08s, background 0.1s, color 0.1s;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.09) inset,
    0 -1px 0 rgba(0,0,0,0.4) inset,
    0 2px 0 #1E2124,
    0 4px 8px rgba(0,0,0,0.35);
  position: relative;
}

.hw-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #555C65 0%, #454B53 100%);
  color: #C0C8D4;
}

.hw-btn:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow:
    0 1px 0 rgba(0,0,0,0.3) inset,
    0 0px 0 #1E2124,
    0 1px 4px rgba(0,0,0,0.3);
}

.hw-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* LED on button face */
.hw-btn-led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2A2E33;
  border: 1px solid #1A1D20;
  flex-shrink: 0;
  transition: background 0.2s, box-shadow 0.2s;
}

.hw-btn-led.hw-led-red {
  background: rgba(255,77,77,0.25);
  border-color: rgba(255,77,77,0.3);
}

.hw-btn-led.hw-led-green {
  background: rgba(0,245,160,0.15);
  border-color: rgba(0,245,160,0.2);
}

.hw-btn-led.hw-led-green.on {
  background: #00F5A0;
  box-shadow: 0 0 4px rgba(0,245,160,0.8), 0 0 10px rgba(0,245,160,0.4);
}

.hw-btn-label { pointer-events: none; }

/* specific button colors */
.hw-btn-stop {
  border-color: rgba(255,77,77,0.3);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.07) inset,
    0 -1px 0 rgba(0,0,0,0.4) inset,
    0 2px 0 #1E2124,
    0 4px 8px rgba(0,0,0,0.35);
}

.hw-btn-play.active {
  background: linear-gradient(180deg, #2A4035 0%, #1E3028 100%);
  color: #A8FFD8;
  border-color: rgba(0,245,160,0.25);
}

.hw-btn-loop.active {
  background: linear-gradient(180deg, #3A3F47 0%, #2E343B 100%);
  color: #C0C8D4;
  border-top-color: rgba(255,255,255,0.18);
}

.hw-btn-analyze {
  font-weight: 700;
}

.hw-btn-analyze:not(:disabled) {
  background: linear-gradient(180deg, #484E56 0%, #393F46 100%);
}

.hw-btn-analyze.active {
  background: linear-gradient(180deg, #1E3028 0%, #142219 100%);
  color: #00F5A0;
  border-color: rgba(0,245,160,0.3);
}

/* ── Divider ── */
.hw-controls-divider {
  width: 1px;
  background: linear-gradient(180deg, transparent, #1E2124 20%, #1E2124 80%, transparent);
  margin: 0 1rem;
  flex-shrink: 0;
}

/* ── Knobs ── */
.hw-controls-right {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hw-knobs-row {
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
}

.hw-knob-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.hw-knob-ring {
  position: relative;
  width: 64px;
  height: 64px;
}

.hw-knob-ring svg {
  position: absolute;
  inset: 0;
  transform: rotate(-135deg);
  filter: drop-shadow(0 0 1px rgba(0,0,0,0.9));
}

.knob-ring-track {
  fill: none;
  stroke: #1E2124;
  stroke-width: 4;
  stroke-linecap: round;
}

.knob-ring-fill {
  fill: none;
  stroke: rgba(0,245,160,0.25);
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.4s ease, stroke 0.3s;
}

.knob-ring-fill.active {
  stroke: #00F5A0;
  filter: drop-shadow(0 0 3px rgba(0,245,160,0.5));
}

/* Physical knob body */
.hw-knob-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-135deg);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 36% 30%, #5E6470, #353A40);
  border: 1px solid #282D33;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.1) inset,
    0 -2px 4px rgba(0,0,0,0.8) inset,
    0 3px 8px rgba(0,0,0,0.7),
    0 1px 0 rgba(255,255,255,0.04);
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
}

.hw-knob-body.spinning {
  animation: knobSpin 3s linear infinite;
}

@keyframes knobSpin {
  from { transform: translate(-50%, -50%) rotate(-135deg); }
  to   { transform: translate(-50%, -50%) rotate(225deg); }
}

/* Knob rotation presets */
.deck-rot-a { transform: translate(-50%, -50%) rotate(-63deg); }
.deck-rot-a.spinning { animation-name: knobSpinA; }
@keyframes knobSpinA {
  from { transform: translate(-50%, -50%) rotate(-63deg); }
  to   { transform: translate(-50%, -50%) rotate(297deg); }
}

.deck-rot-b { transform: translate(-50%, -50%) rotate(-135deg); }
.deck-rot-b.spinning { animation-name: knobSpinB; }
@keyframes knobSpinB {
  from { transform: translate(-50%, -50%) rotate(-135deg); }
  to   { transform: translate(-50%, -50%) rotate(225deg); }
}

.deck-rot-c { transform: translate(-50%, -50%) rotate(-27deg); }
.deck-rot-c.spinning { animation-name: knobSpinC; }
@keyframes knobSpinC {
  from { transform: translate(-50%, -50%) rotate(-27deg); }
  to   { transform: translate(-50%, -50%) rotate(333deg); }
}

/* White indicator line */
.hw-knob-indicator {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 8px;
  background: rgba(255,255,255,0.9);
  border-radius: 1px;
  box-shadow: 0 0 4px rgba(255,255,255,0.4);
}

.hw-knob-label {
  font-size: 0.52rem;
  letter-spacing: 0.14em;
  color: #6A7280;
  text-transform: uppercase;
  margin-top: 2px;
}

.hw-knob-value {
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: #A8B0BC;
}

/* ═════════════════════════════════════════════════════════════
   FOOTER STRIP
   ═════════════════════════════════════════════════════════════ */

.hw-footer-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 1.2rem;
  background: #222528;
  border-top: 1px solid #1A1D20;
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  color: #40464E;
  text-transform: uppercase;
}

/* ═════════════════════════════════════════════════════════════
   RESPONSIVE
   ═════════════════════════════════════════════════════════════ */

@media (max-width: 600px) {
  .hw-controls-section {
    flex-direction: column;
    gap: 1rem;
  }

  .hw-controls-divider {
    width: 100%;
    height: 1px;
    margin: 0;
    background: linear-gradient(90deg, transparent, #1E2124 20%, #1E2124 80%, transparent);
  }

  .hw-controls-right {
    justify-content: flex-start;
  }

  .hw-knobs-row {
    gap: 0.9rem;
  }

  .crt-section {
    padding: 0.7rem 0.7rem 0.4rem;
  }

  .crt-screen {
    min-height: 180px;
  }
}
"""

pathlib.Path(r'c:\Users\acer\MixFix\src\styles\Dashboard.css').write_text(css, encoding='utf-8')
size = pathlib.Path(r'c:\Users\acer\MixFix\src\styles\Dashboard.css').stat().st_size
print(f"Dashboard.css written: {size} bytes")
