import { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'

export default function useDroneSynth(masterGain) {
    const [padSynth, setPadSynth] = useState(null)
    const [activeDroneSourceId, setActiveDroneSourceId] = useState(null)

    const activeDroneNotesRef = useRef([])

    useEffect(() => {
        if (!masterGain) return

        const droneFilter = new Tone.Filter({
            type: 'lowpass',
            frequency: 5000,
            rolloff: -24,
            Q: 0.1,
        })

        const droneDelay = new Tone.PingPongDelay({
            delayTime: '4n',
            feedback: 0.24,
            wet: 0.5,
        })

        const droneReverb = new Tone.Reverb({
            decay: 6.5,
            preDelay: 0.05,
            wet: 0.5,
        })

        const newPadSynth = new Tone.PolySynth(Tone.MonoSynth, {
            oscillator: {
                type: 'fatsawtooth',
                count: 3,
                spread: 20,
            },
            envelope: {
                attack: 1.4,
                decay: 0.3,
                sustain: 0.8,
                release: 4.5,
            },
            filter: {
                type: 'lowpass',
                frequency: 1800,
                rolloff: -24,
                Q: 1,
            },
            filterEnvelope: {
                attack: 1.2,
                decay: 0.5,
                sustain: 0.5,
                release: 3,
                baseFrequency: 300,
                octaves: 2,
            },
        })

        newPadSynth.volume.value = -10
        newPadSynth.chain(droneFilter, droneDelay, droneReverb, masterGain)

        setPadSynth(newPadSynth)

        return () => {
            activeDroneNotesRef.current = []
            newPadSynth.dispose()
            droneFilter.dispose()
            droneDelay.dispose()
            droneReverb.dispose()
        }
    }, [masterGain])

    function stopDrone() {
        if (!padSynth || activeDroneNotesRef.current.length === 0) return

        padSynth.triggerRelease(activeDroneNotesRef.current)
        activeDroneNotesRef.current = []
        setActiveDroneSourceId(null)
    }

    async function enableDrone(sourceId, notes) {
        if (!padSynth) return

        await Tone.start()

        stopDrone()

        padSynth.triggerAttack(notes)
        activeDroneNotesRef.current = notes
        setActiveDroneSourceId(sourceId)
    }

    function disableDrone(sourceId) {
        if (activeDroneSourceId === sourceId) {
            stopDrone()
        }
    }

    return {
        activeDroneSourceId,
        enableDrone,
        disableDrone,
        stopDrone,
    }
}