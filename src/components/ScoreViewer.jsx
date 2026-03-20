import { useState, useEffect, useRef } from 'react'
import * as alphaTab from '@coderline/alphatab'
import './ScoreViewer.css'

export default function ScoreViewer() {

    const containerRef = useRef(null)
    const viewportRef = useRef(null)
    const apiRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const api = new alphaTab.AlphaTabApi(containerRef.current, {
            file: '/musicxml/test.musicxml',
            player: {
                enablePlayer: true,
                soundFont: '/soundfont/sonivox.sf2',
                scrollElement: viewportRef.current
            }
        })

        apiRef.current = api

        api.renderStarted.on(() => {
            setLoading(true)
        })

        api.renderFinished.on(() => {
            setLoading(false)
        })

        api.playerStateChanged.on((e) => {
            setIsPlaying(e.state === alphaTab.synth.PlayerState.Playing)
        })

        return () => {
            api.destroy()
        }
    }, [])

    const handlePlay = () => {
        apiRef.current?.playPause()
    }

    return (
        <div className="at-wrap">
            {loading && (
                <div className="at-overlay">
                    <div className="at-overlay-content">
                        loading..
                    </div>
                </div>
            )}

            <div className="at-content">
                <div className="at-viewport" ref={viewportRef}>
                    <div className="at-main" ref={containerRef}></div>
                </div>
            </div>

            <div className="at-controls">
                <button onClick={handlePlay}>{isPlaying ? '❚❚' : '▶'}</button>
            </div>
        </div>
    )
}