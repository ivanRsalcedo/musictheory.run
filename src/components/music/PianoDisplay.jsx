import { useEffect, useRef, useState } from 'react'
import styles from './PianoDisplay.module.css'

const NOTE_TO_SEMITONE = {
    C: 0,
    'C#': 1,
    Db: 1,
    D: 2,
    'D#': 3,
    Eb: 3,
    E: 4,
    F: 5,
    'F#': 6,
    Gb: 6,
    G: 7,
    'G#': 8,
    Ab: 8,
    A: 9,
    'A#': 10,
    Bb: 10,
    B: 11,
}

const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11]
const MIN_MIDI = 36
const MAX_MIDI = 84
const DETAIL_PADDING = 3

function parseNote(note) {
    const match = note.match(/^([A-Ga-g])([#b]?)(-?\d+)$/)

    if (!match) {
        throw new Error(`Invalid note: ${note}`)
    }

    const [, rawLetter, accidental, rawOctave] = match
    const letter = rawLetter.toUpperCase()
    const octave = Number(rawOctave)
    const name = `${letter}${accidental}`

    const semitone = NOTE_TO_SEMITONE[name]

    if (semitone === undefined) {
        throw new Error(`Unsupported note: ${note}`)
    }

    return 12 * (octave + 1) + semitone
}

function midiToNoteName(midi) {
    const octave = Math.floor(midi / 12) - 1
    const name = SHARP_NAMES[midi % 12]
    return `${name}${octave}`
}

function isWhiteKey(midi) {
    return WHITE_SEMITONES.includes(midi % 12)
}

function getRange(notes, size) {
    if (!notes.length || size === 'small') {
        return { first: 36, last: 71 }
    }

    const midiNotes = notes.map(parseNote)
    const min = Math.min(...midiNotes)
    const max = Math.max(...midiNotes)

    return {
        first: Math.max(MIN_MIDI, min - DETAIL_PADDING),
        last: Math.min(MAX_MIDI, max + DETAIL_PADDING),
    }
}

function buildKeys(first, last, whiteKeyWidth) {
    const whiteKeys = []
    const blackKeys = []

    let whiteIndex = 0
    const blackKeyWidth = Math.round(whiteKeyWidth * 0.57)

    for (let midi = first; midi <= last; midi += 1) {
        const noteName = midiToNoteName(midi)

        if (isWhiteKey(midi)) {
            whiteKeys.push({
                midi,
                noteName,
                whiteIndex,
            })
            whiteIndex += 1
        } else {
            blackKeys.push({
                midi,
                noteName,
                left: whiteIndex * whiteKeyWidth - Math.round(blackKeyWidth / 2),
            })
        }
    }

    return { whiteKeys, blackKeys, blackKeyWidth }
}

export default function PianoDisplay({
    notes = [],
    onPlayNote,
    interactive = true,
    showLabels = true,
    size = 'large',
}) {
    const wrapperRef = useRef(null)
    const [smallWidth, setSmallWidth] = useState(0)

    const normalizedNotes = [...new Set(notes.map((note) => midiToNoteName(parseNote(note))))]
    const activeSet = new Set(normalizedNotes)

    const { first, last } = getRange(notes, size)

    useEffect(() => {
        if (size !== 'small') return

        const wrapper = wrapperRef.current
        if (!wrapper) return

        function updateWidth() {
            setSmallWidth(wrapper.clientWidth)
        }

        updateWidth()

        const resizeObserver = new ResizeObserver(() => {
            updateWidth()
        })

        resizeObserver.observe(wrapper)

        return () => {
            resizeObserver.disconnect()
        }
    }, [size])

    let tempWhiteKeyCount = 0

    for (let midi = first; midi <= last; midi += 1) {
        if (isWhiteKey(midi)) {
            tempWhiteKeyCount += 1
        }
    }

    const whiteKeyWidth =
        size === 'small'
            ? Math.max(12, Math.ceil((smallWidth || 420) / tempWhiteKeyCount))
            : 56

    const whiteKeyHeight = size === 'small' ? 72 : 220
    const blackKeyHeight = size === 'small' ? 44 : 132

    const { whiteKeys, blackKeys, blackKeyWidth } = buildKeys(first, last, whiteKeyWidth)

    function handleKeyClick(noteName) {
        if (!interactive) return
        if (onPlayNote) {
            onPlayNote(noteName)
        }
    }

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div
                className={`${styles.keyboard} ${size === 'small' ? styles.keyboardSmall : styles.keyboardLarge}`}
                style={{
                    width: `${whiteKeys.length * whiteKeyWidth}px`,
                    height: `${whiteKeyHeight}px`,
                }}
            >
                <div
                    className={styles.whiteKeys}
                    style={{ height: `${whiteKeyHeight}px` }}
                >
                    {whiteKeys.map((key) => {
                        const isActive = activeSet.has(key.noteName)
                        const keyClassName = isActive
                            ? `${styles.whiteKey} ${styles.activeWhiteKey}`
                            : styles.whiteKey

                        if (interactive) {
                            return (
                                <button
                                    key={key.midi}
                                    type="button"
                                    className={keyClassName}
                                    style={{
                                        width: `${whiteKeyWidth}px`,
                                        height: `${whiteKeyHeight}px`,
                                    }}
                                    onClick={() => handleKeyClick(key.noteName)}
                                    aria-label={key.noteName}
                                >
                                    {showLabels && (
                                        <span className={styles.keyLabel}>
                                            {key.noteName}
                                        </span>
                                    )}
                                </button>
                            )
                        }

                        return (
                            <div
                                key={key.midi}
                                className={keyClassName}
                                style={{
                                    width: `${whiteKeyWidth}px`,
                                    height: `${whiteKeyHeight}px`,
                                }}
                                aria-label={key.noteName}
                            >
                                {showLabels && (
                                    <span className={styles.keyLabel}>
                                        {key.noteName}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div
                    className={styles.blackKeys}
                    style={{ height: `${whiteKeyHeight}px` }}
                >
                    {blackKeys.map((key) => {
                        const isActive = activeSet.has(key.noteName)
                        const keyClassName = isActive
                            ? `${styles.blackKey} ${styles.activeBlackKey}`
                            : styles.blackKey

                        if (interactive) {
                            return (
                                <button
                                    key={key.midi}
                                    type="button"
                                    className={keyClassName}
                                    style={{
                                        left: `${key.left}px`,
                                        width: `${blackKeyWidth}px`,
                                        height: `${blackKeyHeight}px`,
                                    }}
                                    onClick={() => handleKeyClick(key.noteName)}
                                    aria-label={key.noteName}
                                >
                                    {showLabels && (
                                        <span className={styles.blackKeyLabel}>
                                            {key.noteName}
                                        </span>
                                    )}
                                </button>
                            )
                        }

                        return (
                            <div
                                key={key.midi}
                                className={keyClassName}
                                style={{
                                    left: `${key.left}px`,
                                    width: `${blackKeyWidth}px`,
                                    height: `${blackKeyHeight}px`,
                                }}
                                aria-label={key.noteName}
                            >
                                {showLabels && (
                                    <span className={styles.blackKeyLabel}>
                                        {key.noteName}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}