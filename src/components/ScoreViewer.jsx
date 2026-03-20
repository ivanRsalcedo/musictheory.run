import { useState, useEffect, useRef } from 'react'
import * as alphaTab from '@coderline/alphatab'
import './ScoreViewer.css'

export default function ScoreViewer() {

    const containerRef = useRef(null)
    const viewportRef = useRef(null)
    const apiRef = useRef(null)
    const wrapperRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playerReady, setPlayerReady] = useState(false)
    const [playerProgress, setPlayerProgress] = useState('0%')

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
            wrapperRef.current?.focus()
        })

        api.playerStateChanged.on((e) => {
            setIsPlaying(e.state === alphaTab.synth.PlayerState.Playing)
        })

        api.soundFontLoad.on((e) => {
            const percentage = Math.floor((e.loaded / e.total) * 100)
            setPlayerProgress(`${percentage}%`)
        })

        api.playerReady.on(() => {
            setPlayerReady(true)
            setPlayerProgress('')
        })

        return () => {
            api.destroy()
        }
    }, [])

    const handlePlay = () => {
        apiRef.current?.playPause()
    }

    const handleRestart = () => {
        if (!apiRef.current || !viewportRef.current) return

        apiRef.current.stop()
        viewportRef.current.scrollTop = 0
    }

    const handleViewerKeyDown = (e) => {
        if (e.code === 'Space') {
            e.preventDefault()
            apiRef.current?.playPause()
        }
    }

    return (
        <div
            className="at-wrap"
            ref={wrapperRef}
            tabIndex={0}
            onKeyDown={handleViewerKeyDown}
            onClick={() => wrapperRef.current?.focus()}
        >
            
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
                <button onClick={handlePlay} disabled={!playerReady}>
                    {isPlaying ? '❚❚' : '▶'}
                </button>

                <button onClick={handleRestart} disabled={!playerReady}>↺</button>

                <span>{playerProgress}</span>
            </div>
        </div>
    )
}