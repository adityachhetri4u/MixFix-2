import '../styles/AnalysisResults.css'

interface Issue {
  type: string
  severity: 'low' | 'medium' | 'high'
  description: string
  timestamp: number
}

interface AnalysisResultsProps {
  data: {
    fileName: string
    rating: number
    issues: Issue[]
  }
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#e76f51'
      case 'medium':
        return '#f4a261'
      case 'low':
        return '#2a9d8f'
      default:
        return '#6b7280'
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return '#2a9d8f'
    if (rating >= 60) return '#f4a261'
    return '#e76f51'
  }

  const highIssues = data.issues.filter((i) => i.severity === 'high').length
  const mediumIssues = data.issues.filter((i) => i.severity === 'medium').length
  const lowIssues = data.issues.filter((i) => i.severity === 'low').length

  return (
    <div className="analysis-results">
      <div className="results-header">
        <h2>Signal Report: {data.fileName}</h2>
      </div>

      <div className="rating-section">
        <div className="rating-card">
          <div className="rating-value" style={{ color: getRatingColor(data.rating) }}>
            {data.rating}
          </div>
          <div className="rating-label">Tuner Score</div>
          <div className="rating-bar">
            <div
              className="rating-fill"
              style={{
                width: `${data.rating}%`,
                backgroundColor: getRatingColor(data.rating),
              }}
            ></div>
          </div>
        </div>

        <div className="issues-summary">
          <div className="summary-item high">
            <span className="count">{highIssues}</span>
            <span className="label">Hot</span>
          </div>
          <div className="summary-item medium">
            <span className="count">{mediumIssues}</span>
            <span className="label">Warm</span>
          </div>
          <div className="summary-item low">
            <span className="count">{lowIssues}</span>
            <span className="label">Cool</span>
          </div>
        </div>
      </div>

      <div className="issues-section">
        <h3>Dial Warnings</h3>
        {data.issues.length === 0 ? (
          <div className="no-issues">✓ Clean signal. Ready to broadcast.</div>
        ) : (
          <div className="issues-list">
            {data.issues.map((issue, index) => (
              <div key={index} className="issue-item">
                <div
                  className="severity-indicator"
                  style={{ backgroundColor: getSeverityColor(issue.severity) }}
                ></div>
                <div className="issue-content">
                  <div className="issue-title">{issue.type}</div>
                  <div className="issue-description">{issue.description}</div>
                  <div className="issue-timestamp">Time: {issue.timestamp.toFixed(2)}s</div>
                </div>
                <div className="issue-severity">{issue.severity.toUpperCase()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalysisResults
