import { useEffect, useState } from 'react'
import * as Tone from 'tone'

export default function usePianoSampler(masterGain) {
    const [sampler, setSampler] = useState(null)
    const [isSamplerReady, setIsSamplerReady] = useState(false)

    useEffect(() => {
        if (!masterGain) return

        let isMounted = true

        const piano = new Tone.Sampler({
            urls: {
                A1: 'A1.mp3',
                C2: 'C2.mp3',
                'D#2': 'Ds2.mp3',
                'F#2': 'Fs2.mp3',
                A2: 'A2.mp3',
                C3: 'C3.mp3',
                'D#3': 'Ds3.mp3',
                'F#3': 'Fs3.mp3',
                A3: 'A3.mp3',
                C4: 'C4.mp3',
                'D#4': 'Ds4.mp3',
                'F#4': 'Fs4.mp3',
                A4: 'A4.mp3',
                C5: 'C5.mp3',
                'D#5': 'Ds5.mp3',
                'F#5': 'Fs5.mp3',
                A5: 'A5.mp3',
                C6: 'C6.mp3',
            },
            release: 1,
            baseUrl: 'https://tonejs.github.io/audio/salamander/',
            onload: () => {
                if (isMounted) {
                    setIsSamplerReady(true)
                }
            },
        })

        piano.volume.value = -4
        piano.connect(masterGain)

        setSampler(piano)

        return () => {
            isMounted = false
            piano.dispose()
        }
    }, [masterGain])

    function stopPiano() {
        if (sampler && typeof sampler.releaseAll === 'function') {
            sampler.releaseAll(Tone.now())
        }
    }

    async function playChord(notes, duration = '1n') {
        if (!sampler || !isSamplerReady) return

        await Tone.start()

        const now = Tone.now()

        notes.forEach((note) => {
            sampler.triggerAttackRelease(note, duration, now)
        })
    }

    async function playNote(note, duration = '2n') {
        if (!sampler || !isSamplerReady) return

        await Tone.start()
        sampler.triggerAttackRelease(note, duration)
    }

    return {
        isSamplerReady,
        playChord,
        playNote,
        stopPiano,
    }
}