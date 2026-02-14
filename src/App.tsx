import { useEffect, useState } from 'react'
import './styles/App.css'
import FileUpload from './components/FileUpload'
import AnalysisResults from './components/AnalysisResults'
import Dashboard from './components/Dashboard'

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

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [loadedFile, setLoadedFile] = useState<File | null>(null)

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const handleFileUpload = (file: File) => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(URL.createObjectURL(file))
    setLoadedFile(file)
  }

  const handleStartAnalysis = () => {
    if (!loadedFile) return
    
    setIsAnalyzing(true)

    // Simulate analysis - will be replaced with actual ML model call
    setTimeout(() => {
      const mockAnalysis: AnalysisData = {
        fileName: loadedFile.name,
        rating: Math.floor(Math.random() * 40) + 60, // 60-100
        issues: [
          {
            type: 'Clipping',
            severity: 'high',
            description: 'Audio clipping detected at 45% of track duration',
            timestamp: 2.5,
          },
          {
            type: 'Noise Floor',
            severity: 'medium',
            description: 'Background noise detected',
            timestamp: 0.8,
          },
          {
            type: 'Dynamic Range',
            severity: 'low',
            description: 'Limited dynamic range could reduce impact',
            timestamp: 1.2,
          },
        ],
        waveformData: Array.from({ length: 100 }, () => Math.random()),
      }
      setAnalysisData(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleNewAnalysis = () => {
    setAnalysisData(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setLoadedFile(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>MixFix Radio Lab</h1>
        <p>AI Audio Diagnostics for Music Producers</p>
        <nav className="app-menu">
          <button type="button" className="menu-btn">Home</button>
          <button type="button" className="menu-btn">History</button>
          <button type="button" className="menu-btn">User</button>
        </nav>
        <div className="header-dial">
          <div className="dial-window">FM 98.4</div>
          <div className="dial-track"></div>
          <div className="dial-needle"></div>
        </div>
        <div className="dial-scale">
          <span className="dial-label">88</span>
          <span className="dial-label">92</span>
          <span className="dial-label">96</span>
          <span className="dial-label">100</span>
          <span className="dial-label">104</span>
        </div>
        <div className="radio-strip">
          <span className="radio-pill">FM 98.4</span>
          <span className="radio-pill">AM 720</span>
          <span className="radio-pill">STEREO</span>
          <span className="radio-led">ON AIR</span>
        </div>
      </header>

      <main className="app-main">
        {!analysisData ? (
          <FileUpload
            onFileUpload={handleFileUpload}
            onStartAnalysis={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
            audioUrl={audioUrl}
            hasLoadedFile={!!loadedFile}
          />
        ) : (
          <>
            <AnalysisResults data={analysisData} />
            <Dashboard data={analysisData} />
            <button className="btn-new-analysis" onClick={handleNewAnalysis}>
              Analyze Another File
            </button>
          </>
        )}
      </main>

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

export default App
