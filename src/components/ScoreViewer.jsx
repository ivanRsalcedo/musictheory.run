import { useEffect, useRef } from 'react'
import * as alphaTab from '@coderline/alphatab'

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
        <>
            <button onClick={handlePlay}>test</button>
            <div ref={containerRef}></div>
        </>
    )
}