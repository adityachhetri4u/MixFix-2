import { useEffect, useRef } from 'react'
import '../styles/Dashboard.css'

interface DashboardProps {
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
  }
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && data.waveformData) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = '#1a1410'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw waveform
      const width = canvas.width
      const height = canvas.height
      const dataLength = data.waveformData.length

      ctx.strokeStyle = '#2dd4bf'
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let i = 0; i < dataLength; i++) {
        const x = (i / dataLength) * width
        const y = height / 2 - (data.waveformData[i] - 0.5) * height
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      // Draw issue markers
      data.issues.forEach((issue) => {
        const x = (issue.timestamp / 10) * width // Assuming 10 second track
        ctx.fillStyle =
          issue.severity === 'high' ? '#e76f51' : issue.severity === 'medium' ? '#f4a261' : '#2a9d8f'
        ctx.fillRect(x - 2, 0, 4, height)
      })
    }
  }, [data])

  const metrics = [
    {
      label: 'Dynamic Range',
      value: '12.5 dB',
      icon: '📊',
    },
    {
      label: 'Peak Level',
      value: '-0.5 dB',
      icon: '📈',
    },
    {
      label: 'RMS Level',
      value: '-18 dB',
      icon: '🔊',
    },
    {
      label: 'Frequency Range',
      value: '20Hz - 20kHz',
      icon: '🎼',
    },
  ]

  return (
    <div className="dashboard">
      <h2>Studio Console</h2>

      <div className="waveform-section">
        <h3>Signal Scope</h3>
        <div className="waveform-frame">
          <canvas ref={canvasRef} className="waveform-canvas" width={800} height={150}></canvas>
          <div className="crt-overlay"></div>
        </div>
        <div className="waveform-legend">
          <span>
            <span className="legend-color" style={{ backgroundColor: '#2dd4bf' }}></span> Waveform
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#e76f51' }}></span> Hot Issue
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#f4a261' }}></span> Warm Issue
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#2a9d8f' }}></span> Cool Issue
          </span>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="recommendations">
        <h3>Engineer Notes</h3>
        <ul>
          <li>🔧 Reduce clipping by adjusting gain levels</li>
          <li>🎚️ Apply noise reduction to clean up background noise</li>
          <li>📈 Increase dynamic range for better perception</li>
          <li>🎯 Consider adding compression for consistent levels</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
