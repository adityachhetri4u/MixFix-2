import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './styles/App.css'
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import HistoryPage from './components/HistoryPage'
import UserPage from './components/UserPage'
import AnalysisPage from './components/AnalysisPage'
import Sidebar from './components/Sidebar'

interface AnalysisData {
  fileName: string
  rating: number
  issues: Array<{
    type: string
    severity: 'low' | 'medium' | 'high'
    description: string
    timestamp: number
  }>
  waveformData?: number[]
}

export interface AudioInfo {
  sampleRate: number
  duration: number
  channels: number
  tempo: number
  rms: number
  spectralCentroid: number
  zeroCrossingRate: number
  dynamicRange: number
  waveformData: number[]
  format: string
  rating: number
  issues: Array<{
    type: string
    severity: 'low' | 'medium' | 'high'
    description: string
    timestamp: number
  }>
}

function AppContent() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [loadedFile, setLoadedFile] = useState<File | null>(null)
  const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null)

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const handleFileUpload = (file: File) => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(URL.createObjectURL(file))
    setLoadedFile(file)
    setAudioInfo(null)

    // Send to Python backend for real librosa analysis
    const form = new FormData()
    form.append('file', file)
    fetch('/api/analyze', { method: 'POST', body: form })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((data: AudioInfo) => setAudioInfo(data))
      .catch(err => console.warn('Backend not running — using mock data.', err))
  }

  const handleStartAnalysis = () => {
    if (!loadedFile) return
    setIsAnalyzing(true)
    navigate('/analysis')          // go immediately — show scan screen there

    const capturedInfo = audioInfo
    setTimeout(() => {
      const analysis: AnalysisData = {
        fileName: loadedFile.name,
        rating: capturedInfo?.rating ?? (Math.floor(Math.random() * 40) + 60),
        issues: capturedInfo?.issues as AnalysisData['issues'] ?? [
          { type: 'Clipping', severity: 'high', description: 'Audio clipping detected at 45% of track duration', timestamp: 2.5 },
          { type: 'Noise Floor', severity: 'medium', description: 'Background noise detected', timestamp: 0.8 },
          { type: 'Dynamic Range', severity: 'low', description: 'Limited dynamic range could reduce impact', timestamp: 1.2 },
        ],
        waveformData: capturedInfo?.waveformData ?? Array.from({ length: 100 }, () => Math.random()),
      }
      setAnalysisData(analysis)
      setIsAnalyzing(false)
    }, 6000)
  }

  const handleNewAnalysis = () => {
    setAnalysisData(null)
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setLoadedFile(null)
    setAudioInfo(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <button className="nav-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="app-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>MixFix</h1>
        <button className="profile-btn" onClick={() => navigate('/user')} aria-label="User profile">
          👤
        </button>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Routes>
        <Route
          path="/app"
          element={
            <HomePage
              isAnalyzing={isAnalyzing}
              audioUrl={audioUrl}
              hasLoadedFile={!!loadedFile}
              onFileUpload={handleFileUpload}
              onStartAnalysis={handleStartAnalysis}
              fileName={loadedFile?.name}
              audioInfo={audioInfo}
            />
          }
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route
          path="/analysis"
          element={
            <AnalysisPage
              data={analysisData}
              isAnalyzing={isAnalyzing}
              fileName={loadedFile?.name}
              onNewAnalysis={handleNewAnalysis}
            />
          }
        />
        <Route path="/user" element={<UserPage />} />
      </Routes>

      <footer className="app-footer">
        <div className="footer-inner">
          <span className="footer-brand">MixFix &copy; 2026</span>
          <span className="footer-copy">AI-powered audio analysis platform for producers</span>
          <div className="footer-links">
            <button type="button" className="footer-link">Support</button>
            <button type="button" className="footer-link">Privacy</button>
            <button type="button" className="footer-link">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  )
}

export default App
