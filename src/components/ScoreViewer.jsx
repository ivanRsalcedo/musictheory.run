import { useEffect, useRef } from 'react'
import * as alphaTab from '@coderline/alphatab'
import './ScoreViewer.css'

export default function ScoreViewer() {

    const containerRef = useRef(null)
    const apiRef = useRef(null)

    useEffect(() => {
        const api = new alphaTab.AlphaTabApi(containerRef.current,{
            file: '/musicxml/test.musicxml',
            player: {
                enablePlayer: true,
                soundFont: '/soundfont/sonivox.sf2'
            }
        })

        apiRef.current = api

        return () => {
            api.destroy()
        }
    }, [])

    const handlePlay = () => {
        apiRef.current?.playPause()
    }

    return (
        <div className="at-wrap">
            <div className="at-overlay">
                <div className="at-overlay-content">
                    loading..
                </div>
            </div>

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