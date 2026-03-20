import { useState, useEffect, useRef } from 'react'
import * as alphaTab from '@coderline/alphatab'
import './ScoreViewer.css'

export default function ScoreViewer() {

    const containerRef = useRef(null)
    const apiRef = useRef(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const api = new alphaTab.AlphaTabApi(containerRef.current, {
            file: '/musicxml/test.musicxml',
            player: {
                enablePlayer: true,
                soundFont: '/soundfont/sonivox.sf2'
            }
        })

        apiRef.current = api

        api.renderStarted.on(() => {
            setLoading(true)
        })

        api.renderFinished.on(() => {
            setLoading(false)
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
                <div className="at-viewport">
                    <div className="at-main" ref={containerRef}></div>
                </div>
            </div>

            <div className="at-controls">
                <button onClick={handlePlay}>Play / Pause</button>
            </div>
        </div>
    )
}