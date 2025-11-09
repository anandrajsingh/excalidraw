"use client"
import { useEffect, useRef } from "react"
import { initDraw } from "../draw"

export function RoomCanvas({ roomId }: { roomId: string }) {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080")
        ws.onopen = () => {
            if(canvasRef.current ){
                initDraw(canvasRef.current, ws)
            }
        }
    },[])

    return <div>
        <canvas ref={canvasRef} width={1800} height={900}></canvas>
    </div>
}