"use client"
import { useEffect, useRef, useState } from "react"
import { initDraw } from "../draw"
import { IconButton } from "./IconFunction";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

export type Tool = "circle" | "rect" | "pencil";

export function RoomCanvas({ roomId }: { roomId: string }) {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedTool, setSelectedTool] = useState<Tool>("rect");
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        
        const ws = new WebSocket(`ws://localhost:8080?token=${token}`)

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
            if(canvasRef.current ){
                initDraw(canvasRef.current, ws, roomId)
            }
        }
    },[])

    return <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
}

function TopBar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void;
}){
    return <div style={{position: "fixed", top: 10, left: 10}}>
        <div className="flex gap-t">
            <IconButton onClick={() => {setSelectedTool("pencil")}} activated={selectedTool === "pencil"} icon={<Pencil/>}/>
            <IconButton onClick={() => {setSelectedTool("circle")}} activated={selectedTool === "circle"} icon={<Circle/>}/>
            <IconButton onClick={() => {setSelectedTool("rect")}} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon/>}/>
        </div>
    </div>
}