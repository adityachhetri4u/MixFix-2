import { useState } from 'react'
import TextType from './TextType'
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
    waveformData?: number[]
  }
}

function renderBar(pct: number): string {
  const filled = Math.round((pct / 100) * 20)
  return '█'.repeat(filled) + '░'.repeat(20 - filled)
}

function getGrade(rating: number): string {
  if (rating >= 95) return 'S+'
  if (rating >= 90) return 'S'
  if (rating >= 85) return 'A+'
  if (rating >= 80) return 'A'
  if (rating >= 75) return 'B+'
  if (rating >= 70) return 'B'
  if (rating >= 65) return 'C+'
  if (rating >= 60) return 'C'
  return 'D'
}

function sevTag(sev: 'low' | 'medium' | 'high'): string {
  return sev === 'high' ? 'HIGH' : sev === 'medium' ? 'MED ' : 'LOW '
}

type Line = { text: string; className: string; speed: number }

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  const highCount = data.issues.filter(i => i.severity === 'high').length
  const medCount  = data.issues.filter(i => i.severity === 'medium').length
  const lowCount  = data.issues.filter(i => i.severity === 'low').length

  const lines: Line[] = [
    { text: 'MIXFIX OS v2.1 — SIGNAL ANALYSIS REPORT', className: 'ap-tl ln-header', speed: 22 },
    { text: '═'.repeat(56),                            className: 'ap-tl ln-div',    speed: 3  },
    { text: `  FILE        ${data.fileName}`,           className: 'ap-tl ln-val',    speed: 20 },
    { text: '═'.repeat(56),                            className: 'ap-tl ln-div',    speed: 3  },
    { text: ' ',                                       className: 'ap-tl ln-div',    speed: 1  },
    { text: '// SIGNAL QUALITY',                       className: 'ap-tl ln-header', speed: 22 },
    { text: `  SCORE     [${renderBar(data.rating)}]  ${data.rating}%`,
                                                       className: 'ap-tl ln-bar',    speed: 5  },
    { text: `  GRADE     ${getGrade(data.rating)}`,    className: 'ap-tl ln-val',    speed: 20 },
    { text: `  ALERTS    HIGH:${highCount}  MED:${medCount}  LOW:${lowCount}`,
                                                       className: 'ap-tl ln-val',    speed: 20 },
    { text: '─'.repeat(56),                            className: 'ap-tl ln-div',    speed: 3  },
    { text: ' ',                                       className: 'ap-tl ln-div',    speed: 1  },
    { text: `// ISSUE REPORT — ${data.issues.length} TOTAL`,
                                                       className: 'ap-tl ln-header', speed: 22 },
    { text: '─'.repeat(56),                            className: 'ap-tl ln-div',    speed: 3  },
    ...(data.issues.length === 0
      ? [{ text: '✓ CLEAN SIGNAL — NO ISSUES DETECTED', className: 'ap-tl ln-ok', speed: 20 }]
      : data.issues.flatMap((issue, i): Line[] => [
          { text: `[${sevTag(issue.severity)}]  ${String(i + 1).padStart(2, '0')}  ${issue.type.toUpperCase()}`,
            className: `ap-tl ap-ln-issue ap-sev-${issue.severity}`, speed: 18 },
          { text: `         ${issue.description}  @${issue.timestamp.toFixed(2)}s`,
            className: 'ap-tl ln-issue-desc', speed: 15 },
        ])
    ),
    { text: '─'.repeat(56),                            className: 'ap-tl ln-div',    speed: 3  },
    { text: ' ',                                       className: 'ap-tl ln-div',    speed: 1  },
    { text: `STATUS: COMPLETE   ISSUES: ${data.issues.length}   GRADE: ${getGrade(data.rating)}`,
                                                       className: 'ap-tl ln-status', speed: 18 },
    { text: '▸ REVIEW COMPLETE — SELECT ACTION BELOW', className: 'ap-tl ln-prompt', speed: 20 },
  ]

  const [revealed, setRevealed] = useState(0)
  const advance = () => setRevealed(n => Math.min(n + 1, lines.length))

  return (
    <div className="ap-term-lines">
      {lines.map((line, i) => {
        if (i < revealed) {
          // Already typed — render as static text
          return <div key={i} className={line.className}>{line.text}</div>
        }
        if (i === revealed) {
          // Currently typing
          return (
            <TextType
              key={i}
              as="div"
              text={line.text}
              className={line.className}
              typingSpeed={line.speed}
              loop={false}
              pauseDuration={0}
              showCursor
              cursorCharacter="_"
              onSentenceComplete={advance}
            />
          )
        }
        return null
      })}
    </div>
  )
}
