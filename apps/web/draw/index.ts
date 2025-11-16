import axios from "axios"

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
} | {
    type: "pencil",
    startX: number,
    startY: number,
    endX: number,
    endY: number
}

export function initDraw(canvas: HTMLCanvasElement, socket: WebSocket, roomId: string) {
    const ctx = canvas.getContext("2d")
    
    let existingShapes: Shape[] = []
    
    if (!ctx) return;

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data)

        if(message.type == "chat"){
            const parsedShape = JSON.parse(message.message)
            existingShapes.push(parsedShape.shape)
            clearCanvas(existingShapes, canvas, ctx)
        }
    }

    clearCanvas(existingShapes, canvas, ctx)
    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX
        startY = e.clientY

    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        let shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        }

        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx)
            // ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeRect(startX, startY, width, height)
        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(255,255,255)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(0,0,0"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
    })
}

async function getExistingShapes(roomId: string){
    const res = await axios.get(`http://localhost:3001/chats/${roomId}`)
    const messages = res.data.messages;

    const shapes = messages.map((x:{message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape
    })
}