import { useEffect, useRef, useState } from 'react'
import '../styles/FileUpload.css'

interface FileUploadProps {
  onFileUpload: (file: File) => void
  onStartAnalysis: () => void
  isAnalyzing: boolean
  audioUrl: string | null
  hasLoadedFile: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onStartAnalysis, isAnalyzing, audioUrl, hasLoadedFile }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
  }, [audioUrl])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping
    }
  }, [isLooping])
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasLoadedFile || isAnalyzing) return
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('audio/')) {
        onFileUpload(file)
      } else {
        alert('Please upload an audio file')
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handlePlay = async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const handlePause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const handleStop = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setIsPlaying(false)
    setProgress(0)
  }

  const handleToggleLoop = () => {
    setIsLooping((prev) => !prev)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current || !audioRef.current.duration) return
    const current = audioRef.current.currentTime
    const total = audioRef.current.duration
    setProgress((current / total) * 100)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration || 0)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || duration === 0) return
    const nextTime = (Number(e.target.value) / 100) * duration
    audioRef.current.currentTime = nextTime
    setProgress(Number(e.target.value))
  }

  return (
    <div className="file-upload">
      <div
        className={`upload-area ${isPlaying ? 'playing' : ''} ${hasLoadedFile ? 'loaded' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="radio-marks">
          <span>LINE IN</span>
          <span>AUX</span>
          <span>TAPE</span>
        </div>
          <div className={`tuner-window ${isPlaying ? 'playing' : ''} ${hasLoadedFile ? 'loaded' : ''}`}>
            <span className="signal-text">SIGNAL INPUT</span>
            <span className="tuner-dot"></span>
          </div>
        <div className={`meter-strip ${isPlaying ? 'playing' : ''} ${hasLoadedFile ? 'loaded' : ''}`}>
          <span></span>
          <span></span>
          <span className="active"></span>
          <span className="active"></span>
          <span></span>
          <span></span>
        </div>
          <div className="console-row">
            <div className={`speaker-grill ${isPlaying ? 'playing' : ''}`}>
              <div className="speaker-core"></div>
            </div>
            <div className="control-cluster">
              <div className="knob-row">
                <div className="knob-group">
                  <div className="knob"></div>
                  <span className="knob-label">GAIN</span>
                </div>
                <div className="knob-group">
                  <div className="knob"></div>
                  <span className="knob-label">TONE</span>
                </div>
                <div className="knob-group">
                  <div className="knob"></div>
                  <span className="knob-label">LEVEL</span>
                </div>
              </div>
              <div className="switch-bank">
                <button type="button" className="radio-btn" onClick={handlePlay} disabled={!audioUrl}>
                  <span className="control-btn-text">Play</span>
                </button>
                <button type="button" className="radio-btn" onClick={handlePause} disabled={!audioUrl}>
                  <span className="control-btn-text">Pause</span>
                </button>
                <button type="button" className="radio-btn" onClick={handleStop} disabled={!audioUrl}>
                  <span className="control-btn-text">Stop</span>
                </button>
                <button
                  type="button"
                  className={`radio-btn ${isLooping ? 'active' : ''}`}
                  onClick={handleToggleLoop}
                  disabled={!audioUrl}
                >
                  <span className="control-btn-text">Loop</span>
                </button>
              </div>
              <div className="slider-track">
                <input
                  className="slider-input"
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={handleSeek}
                  disabled={!audioUrl}
                  aria-label="Playback position"
                />
                <div className="slider-handle" style={{ left: `${progress}%` }}></div>
              </div>
            </div>
            <div className={`speaker-grill ${isPlaying ? 'playing' : ''}`}>
              <div className="speaker-core"></div>
            </div>
          </div>
        <audio
          ref={audioRef}
          src={audioUrl ?? undefined}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileInput}
          disabled={isAnalyzing || hasLoadedFile}
          className="file-input"
          id="audio-input"
        />
        <label htmlFor="audio-input" className={`upload-label ${hasLoadedFile ? 'loaded' : ''}`}>
          <span className="load-text">{hasLoadedFile ? 'Tape Loaded' : 'Load Tape'}</span>
        </label>
        {hasLoadedFile && !isAnalyzing && (
          <button className="btn-analyze" onClick={onStartAnalysis}>
            <span className="analyze-icon">▶</span>
            <span className="analyze-btn-text">Analyze Tape</span>
          </button>
        )}
          {isAnalyzing && (
            <div className="scan-leds">
              <span className="scan-led"></span>
              <span className="scan-led"></span>
              <span className="scan-led"></span>
              <span className="scan-led"></span>
              <span className="scan-led"></span>
              <span className="scan-text signal-text">SCANNING</span>
            </div>
          )}
      </div>
    </div>
  )
}

export default FileUpload
