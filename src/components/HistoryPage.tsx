import { useState } from 'react';
import '../styles/HistoryPage.css';
import TextType from './TextType';

interface HistoryRecord {
  id: string;
  filename: string;
  date: string;
  duration: string;
  frequency: string;
  amplitude: string;
}

const SAMPLE_HISTORY: HistoryRecord[] = [
  { id: '1', filename: 'jazz_recording_001.wav',      date: 'NOV 15 2024  14:32', duration: '3:45',  frequency: '2.4 kHz', amplitude: '0.85 dB' },
  { id: '2', filename: 'classical_symphony.mp3',      date: 'NOV 14 2024  09:18', duration: '42:15', frequency: '1.8 kHz', amplitude: '0.92 dB' },
  { id: '3', filename: 'podcast_episode_47.m4a',      date: 'NOV 13 2024  16:45', duration: '58:32', frequency: '2.1 kHz', amplitude: '0.78 dB' },
  { id: '4', filename: 'vinyl_recording_vintage.wav', date: 'NOV 12 2024  11:22', duration: '5:12',  frequency: '3.2 kHz', amplitude: '0.95 dB' },
  { id: '5', filename: 'ambient_field_recording.wav', date: 'NOV 11 2024  13:05', duration: '12:48', frequency: '0.9 kHz', amplitude: '0.65 dB' },
];

export default function HistoryPage() {
  const [typed, setTyped] = useState(false);
  return (
    <main className="history-container">

      {/* Hardware console frame */}
      <div className="hp-hw-frame">

        {/* Top bar */}
        <div className="hp-hw-topbar">
          <div className="hp-hw-brand">
            <span className="hp-hw-brand-name">MIXFIX</span>
            <span className="hp-hw-brand-sub">HISTORY MODULE — v2.1</span>
          </div>
          <div className="hp-hw-topbar-right">
            <div className="hp-hw-led-group">
              <div className="hp-led green on" />
              <span className="hp-led-label">ACTIVE</span>
            </div>
            <div className="hp-hw-led-group">
              <div className="hp-led amber on pulse" />
              <span className="hp-led-label">{SAMPLE_HISTORY.length} REC</span>
            </div>
          </div>
        </div>

        {/* Bezel + CRT */}
        <div className="hp-bezel">
          <div className="hp-crt-screen">

            {/* Window chrome bar */}
            <div className="hp-crt-topbar">
              <div className="hp-crt-leds">
                <span className="hp-crt-led g" />
                <span className="hp-crt-led r" />
                <span className="hp-crt-led y" />
              </div>
              <span className="hp-crt-title">SESSION_LOG.TXT — READ ONLY</span>
              <span className="hp-crt-badge">LIVE</span>
            </div>

            {/* Scrollable terminal body */}
            <div className="hp-crt-body">
              <div className="hp-term-lines">
                <TextType
                  text="MIXFIX OS v2.1 — HISTORY MODULE ACTIVE"
                  as="div"
                  className="hp-tl ln-header"
                  typingSpeed={38}
                  initialDelay={200}
                  loop={false}
                  showCursor
                  cursorCharacter="_"
                  onSentenceComplete={() => setTyped(true)}
                />
                <div className={typed ? 'hp-term-body tt-revealed' : 'hp-term-body tt-hidden'}>
                <div className="hp-tl ln-div">{'═'.repeat(56)}</div>
                <div className="hp-tl ln-ok">LOADING SESSION LOG...          OK</div>
                <div className="hp-tl ln-ok">RECORDS FOUND: {SAMPLE_HISTORY.length}</div>
                <div className="hp-tl ln-div">&nbsp;</div>

                {SAMPLE_HISTORY.map((rec, i) => (
                  <div key={rec.id} className="hp-record-block">
                    <div className="hp-tl ln-rec-header">
                      <span className="hp-tl-idx">[{String(i + 1).padStart(2, '0')}]</span>
                      <span className="hp-tl-fname">{rec.filename}</span>
                    </div>
                    <div className="hp-tl ln-val">{'  '}DATE      {rec.date}</div>
                    <div className="hp-tl ln-val">{'  '}DURATION  {rec.duration.padEnd(8)}  FREQ  {rec.frequency.padEnd(10)}  AMP  {rec.amplitude}</div>
                    <div className="hp-tl ln-div">{'─'.repeat(56)}</div>
                  </div>
                ))}

                <div className="hp-tl ln-div">&nbsp;</div>
                <div className="hp-tl ln-status">STATUS: ALL RECORDS LOADED   TOTAL: {SAMPLE_HISTORY.length} ANALYSES</div>
                <div className="hp-tl ln-prompt">▸ SELECT RECORD TO VIEW FULL ANALYSIS<span className="hp-cursor">█</span></div>
                </div>{/* end hp-term-body */}
              </div>

              {/* CRT overlays */}
              <div className="hp-crt-scanlines" />
              <div className="hp-crt-vignette" />
              <div className="hp-crt-glitch" />
            </div>

            {/* HUD strip */}
            <div className="hp-crt-hud">
              <span><span className="hp-hud-l">MODULE</span><span className="hp-hud-v">HISTORY</span></span>
              <span><span className="hp-hud-l">RECORDS</span><span className="hp-hud-v">{SAMPLE_HISTORY.length}</span></span>
              <span><span className="hp-hud-l">FORMAT</span><span className="hp-hud-v">WAV/MP3/M4A</span></span>
              <span><span className="hp-hud-l">STATUS</span><span className="hp-hud-v">READY</span></span>
            </div>
          </div>
        </div>

        {/* Controls strip */}
        <div className="hp-controls-strip">
          <div className="hp-ctrl-btn grey" />
          <div className="hp-ctrl-btn grey active" />
          <div className="hp-ctrl-btn red" />
          <span className="hp-ctrl-spacer" />
          <span className="hp-ctrl-label">SORT: DATE DESC</span>
          <span className="hp-ctrl-spacer" />
          <div className="hp-knob-wrap">
            <div className="hp-knob" />
            <span className="hp-knob-label">FILTER</span>
          </div>
          <div className="hp-knob-wrap">
            <div className="hp-knob" />
            <span className="hp-knob-label">SCROLL</span>
          </div>
        </div>

        {/* Action bar */}
        <div className="hp-action-bar">
          <button className="hp-action-btn danger">⌫ CLEAR HISTORY</button>
          <button className="hp-action-btn">↓ EXPORT LOG</button>
          <button className="hp-action-btn">⟳ REFRESH</button>
          <span className="hp-action-spacer" />
          <span className="hp-action-info">5 RECORDS  ·  LAST UPDATED: NOV 15 2024</span>
        </div>

      </div>
    </main>
  );
}
