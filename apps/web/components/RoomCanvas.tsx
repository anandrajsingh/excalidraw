"use client"
import { useEffect, useRef } from "react"
import { initDraw } from "../draw"

export function RoomCanvas({ roomId }: { roomId: string }) {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    useEffect(() => {
        if(canvasRef.current){
            initDraw(canvasRef.current)
        }
    },[canvasRef])

    return <div>
        <canvas ref={canvasRef} width={1800} height={900}></canvas>
    </div>
}