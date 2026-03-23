import { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import usePianoSampler from './usePianoSampler'
import useDroneSynth from './useDroneSynth'

export default function useChordAudio() {
    const [masterGain, setMasterGain] = useState(null)
    const activeCardIdRef = useRef(null)

    useEffect(() => {
        const newMasterGain = new Tone.Gain(0.9)
        const safetyLimiter = new Tone.Limiter(-1).toDestination()

        newMasterGain.connect(safetyLimiter)
        setMasterGain(newMasterGain)

        return () => {
            newMasterGain.dispose()
            safetyLimiter.dispose()
        }
    }, [])

    const {
        isSamplerReady,
        playChord: playPianoChord,
        playNote: playPianoNote,
        stopPiano,
    } = usePianoSampler(masterGain)

    const {
        activeDroneSourceId,
        enableDrone: enableDroneSynth,
        disableDrone: disableDroneSynth,
        stopDrone,
    } = useDroneSynth(masterGain)

    function stopAllAudio() {
        stopPiano()
        stopDrone()
        activeCardIdRef.current = null
    }

    function syncCard(cardId) {
        if (!cardId) return

        if (
            activeCardIdRef.current &&
            activeCardIdRef.current !== cardId
        ) {
            stopAllAudio()
        }

        activeCardIdRef.current = cardId
    }

    async function playChord(cardId, notes, duration = '1n') {
        syncCard(cardId)
        await playPianoChord(notes, duration)
    }

    async function playNote(cardId, note, duration = '2n') {
        syncCard(cardId)
        await playPianoNote(note, duration)
    }

    async function enableDrone(cardId, notes) {
        syncCard(cardId)
        await enableDroneSynth(cardId, notes)
    }

    function disableDrone(cardId) {
        disableDroneSynth(cardId)
    }

    return {
        isSamplerReady,
        activeDroneSourceId,
        playChord,
        playNote,
        enableDrone,
        disableDrone,
        stopAllAudio,
    }
}