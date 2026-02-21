import { useState } from 'react';
import '../styles/UserPage.css';
import TextType from './TextType';

export default function UserPage() {
  const [typed, setTyped] = useState(false);
  return (
    <main className="user-container">

      {/* Hardware console frame */}
      <div className="up-hw-frame">

        {/* Top bar */}
        <div className="up-hw-topbar">
          <div className="up-hw-brand">
            <span className="up-hw-brand-name">MIXFIX</span>
            <span className="up-hw-brand-sub">OPERATOR CONSOLE — v2.1</span>
          </div>
          <div className="up-hw-topbar-right">
            <div className="up-hw-led-group">
              <div className="up-led green on" />
              <span className="up-led-label">AUTHENTICATED</span>
            </div>
            <div className="up-hw-led-group">
              <div className="up-led amber on pulse" />
              <span className="up-led-label">247 OPS</span>
            </div>
          </div>
        </div>

        {/* Bezel + CRT */}
        <div className="up-bezel">
          <div className="up-crt-screen">

            {/* Window chrome bar */}
            <div className="up-crt-topbar">
              <div className="up-crt-leds">
                <span className="up-crt-led g" />
                <span className="up-crt-led r" />
                <span className="up-crt-led y" />
              </div>
              <span className="up-crt-title">OPERATOR_PROFILE.SYS — AUTHENTICATED</span>
              <span className="up-crt-badge">ONLINE</span>
            </div>

            {/* Scrollable terminal body */}
            <div className="up-crt-body">
              <div className="up-term-lines">
                <TextType
                  text="MIXFIX OS v2.1 — OPERATOR PROFILE MODULE"
                  as="div"
                  className="up-tl ln-header"
                  typingSpeed={38}
                  initialDelay={200}
                  loop={false}
                  showCursor
                  cursorCharacter="_"
                  onSentenceComplete={() => setTyped(true)}
                />
                <div className={typed ? 'up-term-body tt-revealed' : 'up-term-body tt-hidden'}>
                <div className="up-tl ln-div">{'═'.repeat(56)}</div>
                <div className="up-tl ln-ok">AUTH: TOKEN VALID             SESSION: ACTIVE</div>
                <div className="up-tl ln-div">&nbsp;</div>

                <div className="up-tl ln-header">// IDENTITY</div>
                <div className="up-tl ln-val">{'  '}USERNAME        AudioEngineer_92</div>
                <div className="up-tl ln-val">{'  '}EMAIL           user@mixfix.audio</div>
                <div className="up-tl ln-val">{'  '}MEMBER SINCE    MARCH 2024</div>
                <div className="up-tl ln-val">{'  '}TOTAL ANALYSES  247</div>
                <div className="up-tl ln-div">{'─'.repeat(56)}</div>

                <div className="up-tl ln-header">// PREFERENCES</div>
                <div className="up-tl ln-val">{'  '}ANALYSIS MODE   STANDARD SPECTRUM</div>
                <div className="up-tl ln-val">{'  '}AUTO-SAVE       ENABLED</div>
                <div className="up-tl ln-val">{'  '}THEME           VINTAGE BRASS</div>
                <div className="up-tl ln-val">{'  '}NOTIFICATIONS   ON</div>
                <div className="up-tl ln-div">{'─'.repeat(56)}</div>

                <div className="up-tl ln-header">// STATISTICS</div>
                <div className="up-tl ln-val">{'  '}AVG DURATION    15:32</div>
                <div className="up-tl ln-val">{'  '}PEAK FREQUENCY  2.8 kHz</div>
                <div className="up-tl ln-val">{'  '}AVG AMPLITUDE   0.87 dB</div>
                <div className="up-tl ln-val">{'  '}LAST SESSION    NOV 15, 2024</div>
                <div className="up-tl ln-div">{'─'.repeat(56)}</div>

                <div className="up-tl ln-div">&nbsp;</div>
                <div className="up-tl ln-bar">  USAGE     ████████████████░░░░  80%</div>
                <div className="up-tl ln-bar">  STORAGE   █████████░░░░░░░░░░░  45%</div>
                <div className="up-tl ln-div">&nbsp;</div>
                <div className="up-tl ln-status">STATUS: PROFILE LOADED   PERMISSIONS: STANDARD</div>
                <div className="up-tl ln-prompt">▸ CTRL+E TO MODIFY SETTINGS<span className="up-cursor">█</span></div>
                </div>{/* end up-term-body */}
              </div>

              {/* CRT overlays */}
              <div className="up-crt-scanlines" />
              <div className="up-crt-vignette" />
              <div className="up-crt-glitch" />
            </div>

            {/* HUD strip */}
            <div className="up-crt-hud">
              <span><span className="up-hud-l">USER</span><span className="up-hud-v">AudioEngineer_92</span></span>
              <span><span className="up-hud-l">LEVEL</span><span className="up-hud-v">STANDARD</span></span>
              <span><span className="up-hud-l">OPS</span><span className="up-hud-v">247</span></span>
              <span><span className="up-hud-l">UPTIME</span><span className="up-hud-v">8M 21D</span></span>
            </div>
          </div>
        </div>

        {/* Controls strip */}
        <div className="up-controls-strip">
          <div className="up-ctrl-btn grey" />
          <div className="up-ctrl-btn grey active" />
          <div className="up-ctrl-btn red" />
          <span className="up-ctrl-spacer" />
          <span className="up-ctrl-label">OPERATOR: AUTHENTICATED</span>
          <span className="up-ctrl-spacer" />
          <div className="up-knob-wrap">
            <div className="up-knob" />
            <span className="up-knob-label">VOLUME</span>
          </div>
          <div className="up-knob-wrap">
            <div className="up-knob" />
            <span className="up-knob-label">GAIN</span>
          </div>
        </div>

        {/* Action bar */}
        <div className="up-action-bar">
          <button className="up-action-btn primary">✎ EDIT PROFILE</button>
          <button className="up-action-btn">⚙ CHANGE PASSWORD</button>
          <button className="up-action-btn">↓ EXPORT DATA</button>
          <span className="up-action-spacer" />
          <button className="up-action-btn danger">⏻ SIGN OUT</button>
        </div>

      </div>
    </main>
  );
}
