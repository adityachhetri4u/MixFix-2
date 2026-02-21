import pathlib

BASE = pathlib.Path(r'c:\Users\acer\MixFix\src\styles')

# ── App.css ────────────────────────────────────────────────────────────────────
(BASE / 'App.css').write_text(r"""/* App.css — MixFix v5 */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  background-image: repeating-linear-gradient(
    0deg,
    transparent 0px, transparent 3px,
    rgba(0,245,160,0.018) 3px, rgba(0,245,160,0.018) 4px
  );
  padding: 0.8rem;
}
.app-header {
  position: relative;
  background: var(--surface-1);
  color: var(--text-primary);
  padding: 0.75rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
  z-index: 100;
}
.app-header::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-mid) 40%, var(--border-mid) 60%, transparent);
  pointer-events: none;
}
.nav-menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px; height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  flex-shrink: 0;
  transition: background 0.2s;
}
.nav-menu-btn:hover { background: rgba(255,255,255,0.06); }
.nav-menu-btn span {
  display: block;
  height: 2px;
  background: rgba(0,245,160,0.45);
  border-radius: 2px;
  transition: background 0.2s;
}
.nav-menu-btn:hover span { background: var(--accent); }
.app-logo {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  font-family: var(--font-display);
  letter-spacing: 0.06em;
  color: var(--accent);
  text-shadow: 0 0 18px rgba(0,245,160,0.35), 0 0 40px rgba(0,245,160,0.12);
  flex-grow: 1;
  text-transform: uppercase;
}
.profile-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 34px; height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  flex-shrink: 0;
  margin-left: auto;
  color: rgba(0,245,160,0.55);
}
.profile-btn:hover {
  border-color: rgba(0,245,160,0.55);
  background: var(--accent-dim);
  box-shadow: 0 0 12px var(--accent-glow);
}
.profile-btn:active { transform: scale(0.95); }
.app-main {
  flex: 1;
  position: relative;
  padding: 1.4rem 1.6rem 1.6rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow:
    inset 0 3px 8px rgba(0,0,0,0.7),
    0 20px 60px rgba(0,0,0,0.6),
    0 0 40px rgba(0,245,160,0.03);
}
.app-main::before {
  content: "";
  position: absolute;
  inset: 8px;
  border-radius: 12px;
  border: 1px solid rgba(0,245,160,0.05);
  pointer-events: none;
}
.app-footer {
  background: var(--surface-1);
  color: rgba(0,245,160,0.4);
  text-align: center;
  padding: 0.9rem 1.2rem;
  margin-top: 1rem;
  border-top: 1px solid var(--border);
}
.footer-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem 1.6rem;
}
.footer-brand { font-size: 0.85rem; font-family: var(--font-mono); letter-spacing: 0.08em; color: rgba(0,245,160,0.55); }
.footer-copy  { font-size: 0.8rem;  font-family: var(--font-mono); letter-spacing: 0.06em; color: rgba(0,245,160,0.3); }
.footer-links { display: flex; gap: 0.7rem; flex-wrap: wrap; }
.footer-link {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.3rem 0.9rem;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0,245,160,0.45);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.footer-link:hover {
  color: var(--accent);
  border-color: rgba(0,245,160,0.5);
  box-shadow: 0 0 10px rgba(0,245,160,0.12);
}
.btn-new-analysis {
  display: block;
  margin: 2rem auto 0;
  padding: 0.95rem 2.6rem;
  background: var(--surface-2);
  color: var(--accent);
  border: 1px solid rgba(0,245,160,0.3);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.btn-new-analysis:hover {
  transform: translateY(-2px);
  border-color: rgba(0,245,160,0.65);
  box-shadow: 0 0 20px rgba(0,245,160,0.18), 0 8px 24px rgba(0,0,0,0.4);
}
.btn-new-analysis:active { transform: translateY(1px); }
@media (max-width: 768px) {
  .app-header { padding: 0.8rem 1rem; }
  .app-main { padding: 1.4rem; }
}
""", encoding='utf-8')

# ── Sidebar.css ─────────────────────────────────────────────────────────────────
(BASE / 'Sidebar.css').write_text(r"""/* Sidebar.css — MixFix v5 */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 280px;
  height: 100vh;
  background: var(--surface-1);
  border-right: 1px solid var(--border);
  box-shadow: 4px 0 30px rgba(0,0,0,0.85), 2px 0 0 rgba(0,245,160,0.04);
  z-index: 1000;
  overflow-y: auto;
  transition: left 0.3s cubic-bezier(0.4,0,0.2,1);
}
.sidebar.open { left: 0; }
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  border-bottom: 1px solid var(--border);
  background: var(--accent-dim);
}
.sidebar-header h2 {
  margin: 0;
  color: var(--accent);
  font-size: 1.1rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-shadow: 0 0 16px rgba(0,245,160,0.35);
}
.sidebar-close {
  background: none;
  border: none;
  color: rgba(0,245,160,0.45);
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-close:hover { color: var(--accent); text-shadow: 0 0 10px rgba(0,245,160,0.5); }
.sidebar-nav { padding: 1.2rem 0; }
.nav-section-title {
  padding: 0.6rem 1.2rem;
  margin: 0.8rem 0 0.6rem;
  color: rgba(0,245,160,0.35);
  font-size: 0.7rem;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}
.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.2rem;
  background: none;
  border: none;
  color: rgba(0,245,160,0.5);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: var(--font-mono);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 2px solid transparent;
  letter-spacing: 0.06em;
}
.nav-item:hover {
  background: var(--accent-dim);
  border-left-color: var(--accent);
  color: var(--accent);
  text-shadow: 0 0 10px rgba(0,245,160,0.35);
}
.nav-item:active { transform: translateX(2px); }
.nav-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px; height: 24px;
  font-size: 1rem;
  color: rgba(0,245,160,0.35);
  flex-shrink: 0;
}
.nav-item:hover .nav-icon { color: var(--accent); text-shadow: 0 0 10px rgba(0,245,160,0.6); }
@media (max-width: 768px) {
  .sidebar { width: 250px; left: -250px; }
  .nav-item { padding: 0.8rem 1rem; font-size: 0.85rem; }
}
""", encoding='utf-8')

# ── AnalysisPage.css ────────────────────────────────────────────────────────────
(BASE / 'AnalysisPage.css').write_text(r"""/* AnalysisPage.css — MixFix v5 */
.analysis-main { display: flex; flex-direction: column; gap: 1.5rem; }
.analysis-dashboard-wrap { width: 100%; }
.analysis-dashboard-wrap .dashboard { width: 100%; }
.analysis-header {
  text-align: center;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
}
.analysis-header h2 { margin: 0; color: var(--text-primary); }
.analysis-header .sub-text {
  margin: 0.5rem 0 0;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
}
.analysis-content { display: block; }
.analysis-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 300px;
  text-align: center;
}
.analysis-empty .main-title { color: var(--text-primary); margin: 0; }
.analysis-empty .sub-text   { color: var(--text-muted); margin: 0; }
.back-btn {
  background: var(--surface-2);
  color: var(--accent);
  border: 1px solid rgba(0,245,160,0.25);
  border-radius: 6px;
  padding: 0.7rem 1.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
}
.back-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(0,245,160,0.55);
  box-shadow: 0 0 20px rgba(0,245,160,0.15), 0 8px 20px rgba(0,0,0,0.4);
}
.back-btn:active { transform: translateY(0); }
@media (max-width: 768px) {
  .analysis-header { padding-bottom: 1rem; }
}
""", encoding='utf-8')

# ── AnalysisResults.css ─────────────────────────────────────────────────────────
(BASE / 'AnalysisResults.css').write_text(r"""/* AnalysisResults.css — MixFix v5 */
.analysis-results {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,160,0.02);
  position: relative;
  overflow: hidden;
}
.analysis-results::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px);
  pointer-events: none;
}
.results-header { margin-bottom: 2rem; }
.results-header h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-family: var(--font-display);
  letter-spacing: -0.01em;
}
.rating-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}
.rating-card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}
.rating-value { font-size: 4rem; font-weight: 700; margin-bottom: 0.5rem; }
.rating-label {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 600;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
}
.rating-bar {
  background: var(--surface-3);
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border);
}
.rating-fill { height: 100%; border-radius: 6px; transition: width 0.5s ease; }
.issues-summary { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
.summary-item {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
}
.summary-item.high   { border-left: 3px solid var(--accent); }
.summary-item.medium { border-left: 3px solid rgba(0,245,160,0.5); }
.summary-item.low    { border-left: 3px solid rgba(0,245,160,0.22); }
.summary-item .count {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--accent);
  text-shadow: 0 0 14px rgba(0,245,160,0.4);
}
.summary-item .label {
  display: block;
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.issues-section { margin-top: 2rem; }
.issues-section h3 {
  margin: 0 0 1rem;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-family: var(--font-display);
  letter-spacing: -0.01em;
}
.no-issues {
  background: var(--accent-dim);
  border: 1px solid rgba(0,245,160,0.18);
  border-radius: 6px;
  padding: 1.5rem;
  color: var(--accent);
  text-align: center;
  font-weight: 600;
}
.issue-list { display: flex; flex-direction: column; gap: 1rem; }
.issue-item {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.2rem;
  border-left: 3px solid var(--danger);
}
.issue-item.high   { border-left-color: var(--danger); }
.issue-item.medium { border-left-color: rgba(255,165,0,0.7); }
.issue-item.low    { border-left-color: rgba(0,245,160,0.35); }
.issue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}
.issue-label { color: var(--text-primary); font-weight: 600; font-size: 0.9rem; }
.issue-badge {
  font-size: 0.65rem;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}
.issue-badge.high   { background: var(--danger-dim); color: #ff8080; border: 1px solid rgba(255,77,77,0.25); }
.issue-badge.medium { background: rgba(255,165,0,0.1); color: rgba(255,165,0,0.85); border: 1px solid rgba(255,165,0,0.25); }
.issue-badge.low    { background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(0,245,160,0.2); }
.issue-desc { color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; }
@media (max-width: 640px) {
  .rating-section { grid-template-columns: 1fr; }
  .issues-summary { grid-template-columns: 1fr 1fr; }
}
""", encoding='utf-8')

# ── HistoryPage.css ─────────────────────────────────────────────────────────────
(BASE / 'HistoryPage.css').write_text(r"""/* HistoryPage.css — MixFix v5 */
.history-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  min-height: calc(100vh - 280px);
}
.history-panel {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 900px;
  width: 100%;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.4), 0 0 40px rgba(0,245,160,0.03);
}
.history-panel h2 { margin: 0 0 0.5rem; color: var(--text-primary); }
.history-panel > .sub-text { margin: 0 0 2rem; color: var(--text-secondary); font-size: 0.85rem; font-family: var(--font-mono); }
.history-records { display: flex; flex-direction: column; gap: 1.2rem; margin: 2rem 0; }
.history-record {
  background: var(--accent-dim);
  border-left: 3px solid rgba(0,245,160,0.28);
  padding: 1.5rem;
  border-radius: 6px;
  transition: all 0.25s;
}
.history-record:hover {
  background: rgba(0,245,160,0.06);
  border-left-color: var(--accent);
  box-shadow: 0 0 20px rgba(0,245,160,0.06);
}
.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.record-filename { color: var(--text-primary); font-weight: 600; font-family: var(--font-mono); letter-spacing: 0.04em; }
.record-date { color: var(--text-secondary); font-size: 0.85rem; font-family: var(--font-mono); }
.record-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: var(--surface-2);
  border-radius: 4px;
  border: 1px solid var(--border);
}
.detail-label { color: var(--text-secondary); margin-right: 0.8rem; font-weight: 500; font-size: 0.8rem; font-family: var(--font-mono); }
.detail-value { color: var(--accent); font-family: var(--font-mono); letter-spacing: 0.04em; }
.history-info { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); text-align: center; }
.history-info .sub-text { margin: 0; font-size: 0.95rem; color: var(--text-muted); }
.history-info .signal-text { font-weight: 600; font-size: 1rem; display: inline; }
@media (max-width: 768px) {
  .history-panel { padding: 1.5rem; }
  .record-header { flex-direction: column; align-items: flex-start; }
  .record-details { grid-template-columns: 1fr; }
  .detail-item { flex-direction: column; align-items: flex-start; }
  .detail-label { margin-right: 0; margin-bottom: 0.4rem; }
}
""", encoding='utf-8')

# ── UserPage.css ────────────────────────────────────────────────────────────────
(BASE / 'UserPage.css').write_text(r"""/* UserPage.css — MixFix v5 */
.user-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  min-height: calc(100vh - 280px);
  background: transparent;
}
.user-panel {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 700px;
  width: 100%;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.4);
}
.user-panel h2 { margin: 0 0 0.5rem; color: var(--text-primary); }
.user-panel > .sub-text { margin: 0 0 2rem; color: var(--text-secondary); font-size: 0.9rem; }
.profile-section, .preferences-section, .stats-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}
.profile-section:last-child, .preferences-section:last-child, .stats-section:last-child {
  border-bottom: none; margin-bottom: 0; padding-bottom: 0;
}
.profile-section h3, .preferences-section h3, .stats-section h3 {
  color: var(--accent);
  margin: 0 0 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--border-mid);
  font-weight: 600;
  letter-spacing: 0.02em;
}
.profile-info { display: flex; flex-direction: column; gap: 1rem; }
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.25s;
}
.info-row:hover { background: var(--surface-3); box-shadow: 0 0 12px rgba(0,245,160,0.06); }
.info-label { color: var(--text-secondary); font-weight: 500; font-size: 0.85rem; }
.info-value { color: var(--text-primary); text-align: right; font-family: var(--font-mono); }
.preference-list { display: flex; flex-direction: column; gap: 1rem; }
.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.25s;
}
.preference-item:hover { background: var(--surface-3); box-shadow: 0 0 12px rgba(0,245,160,0.06); }
.preference-item .knob-label { color: var(--text-secondary); font-weight: 500; margin-right: 1rem; }
.preference-item .load-text  { color: var(--accent); text-shadow: 0 0 8px rgba(0,245,160,0.3); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.2rem; }
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  text-align: center;
  transition: all 0.25s;
}
.stat-item:hover {
  background: var(--surface-3);
  box-shadow: 0 0 16px rgba(0,245,160,0.08);
  transform: translateY(-2px);
}
.stat-label {
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
}
.stat-value { color: var(--text-primary); font-size: 1.1rem; font-weight: 600; font-family: var(--font-mono); }
@media (max-width: 600px) {
  .user-panel { padding: 1.5rem; }
  .info-row, .preference-item, .stat-item { flex-direction: column; align-items: flex-start; text-align: left; }
  .info-label, .preference-item .knob-label { margin-right: 0; margin-bottom: 0.4rem; }
  .stat-item { align-items: center; text-align: center; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
""", encoding='utf-8')

print("All CSS files written successfully!")
for name in ['App.css','Sidebar.css','AnalysisPage.css','AnalysisResults.css','HistoryPage.css','UserPage.css']:
    size = (BASE / name).stat().st_size
    print(f"  {name}: {size} bytes")
