import { createElement, ElementType, useEffect, useMemo, useRef, useState } from 'react'
import '../styles/TextType.css'

interface VariableSpeed {
  min: number
  max: number
}

interface TextTypeProps {
  text: string | string[]
  as?: ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: string
  cursorClassName?: string
  /** Kept for API compatibility — blink is driven by CSS */
  cursorBlinkDuration?: number
  textColors?: string[]
  variableSpeed?: VariableSpeed
  onSentenceComplete?: (text: string, index: number) => void
  /** Kept for API compatibility */
  startOnVisible?: boolean
  reverseMode?: boolean
  [key: string]: unknown
}

export default function TextType({
  text,
  as = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName,
  textColors,
  variableSpeed,
  onSentenceComplete,
  reverseMode = false,
  // intentionally unused — kept for API compat
  cursorBlinkDuration: _cbd,
  startOnVisible: _sov,
  ...rest
}: TextTypeProps) {
  const sentences = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Array.isArray(text) ? text.join('\x00') : text],
  )

  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)

  const mountedRef = useRef(true)
  const onCompleteRef = useRef(onSentenceComplete)
  onCompleteRef.current = onSentenceComplete

  useEffect(() => {
    mountedRef.current = true

    let sentenceIdx = 0
    let charIdx = 0
    let phase: 'typing' | 'pause' | 'deleting' | 'done' = 'typing'
    let timer: ReturnType<typeof setTimeout>

    const getSpeed = (deleting = false): number => {
      if (variableSpeed) {
        return (
          Math.random() * (variableSpeed.max - variableSpeed.min) +
          variableSpeed.min
        )
      }
      return deleting ? deletingSpeed : typingSpeed
    }

    const getSentence = (idx: number): string => {
      const s = sentences[idx]
      return reverseMode ? [...s].reverse().join('') : s
    }

    const run = (): void => {
      if (!mountedRef.current || phase === 'done') return

      if (phase === 'typing') {
        const sentence = getSentence(sentenceIdx)
        if (charIdx <= sentence.length) {
          setDisplayText(sentence.slice(0, charIdx))
          setIsTyping(true)
          charIdx++
          timer = setTimeout(run, getSpeed(false))
        } else {
          // Finished typing this sentence
          setIsTyping(false)
          if (textColors) setColorIndex(sentenceIdx % textColors.length)
          onCompleteRef.current?.(sentences[sentenceIdx], sentenceIdx)

          const isLast = sentenceIdx === sentences.length - 1
          if (!loop && isLast) {
            phase = 'done'
            return
          }
          phase = 'pause'
          timer = setTimeout(run, pauseDuration)
        }
      } else if (phase === 'pause') {
        if (sentences.length > 1) {
          phase = 'deleting'
          timer = setTimeout(run, getSpeed(true))
        } else {
          // Single sentence — loop back
          charIdx = 0
          phase = 'typing'
          timer = setTimeout(run, getSpeed(false))
        }
      } else if (phase === 'deleting') {
        const sentence = getSentence(sentenceIdx)
        if (charIdx > 0) {
          charIdx--
          setDisplayText(sentence.slice(0, charIdx))
          timer = setTimeout(run, getSpeed(true))
        } else {
          sentenceIdx = (sentenceIdx + 1) % sentences.length
          charIdx = 0
          phase = 'typing'
          setIsTyping(true)
          timer = setTimeout(run, getSpeed(false))
        }
      }
    }

    setDisplayText('')
    setIsTyping(true)
    timer = setTimeout(run, initialDelay)

    return () => {
      mountedRef.current = false
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentences, typingSpeed, deletingSpeed, loop, pauseDuration, initialDelay, reverseMode])

  const cursorHidden = hideCursorWhileTyping && isTyping
  const color = textColors ? textColors[colorIndex] : undefined

  return createElement(
    as,
    {
      className: `text-type${className ? ` ${className}` : ''}`,
      style: color ? { color } : undefined,
      ...rest,
    },
    displayText,
    showCursor &&
      createElement(
        'span',
        {
          key: 'cursor',
          className: [
            'text-type__cursor',
            cursorHidden ? 'text-type__cursor--hidden' : '',
            cursorClassName ?? '',
          ]
            .filter(Boolean)
            .join(' '),
          'aria-hidden': 'true',
        },
        cursorCharacter,
      ),
  )
}
