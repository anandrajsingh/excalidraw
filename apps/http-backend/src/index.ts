import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
import { CreateRoomSchema, SigninSchema, SignupSchema } from "@repo/zod/types";
import Express from "express";
import jwt from "jsonwebtoken"
import { AuthRequest, middleware } from "./middleware";
import cors from "cors"

const app = Express()
app.use(Express.json())
app.use(cors())

app.post('/signup', async(req, res) => {
    const parsedData = SignupSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({message: "Incorrect Inputs."})
        return
    }

    const user = await prismaClient.user.create({
        data: {
            email: parsedData.data?.email,
            password: parsedData.data?.password,
            name: parsedData.data?.name
        }
    })

    res.json({userId: user.id})
})

app.post("/signin", async(req, res) => {
    const parsedData = SigninSchema.safeParse(req.body)
    if(!parsedData){
        res.json({message: "Incorrect Input"})
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.email,
            password: parsedData.data?.password
        }
    })

    if(!user){
        res.status(400).json({message: "Not Authorised."})
    }

    const token = jwt.sign({userId: user?.id}, JWT_SECRET)

    res.json({token})
})

app.get("/room", middleware, async(req:AuthRequest, res) => {
    const userId = req.user.userId
    try {
        const rooms = await prismaClient.room.findMany({
            where: {
                adminId:userId
            }
        })
        res.json(rooms)
    } catch (error) {
        res.json({Error: "Can't fetch rooms right now"})
    }
})

app.post("/room", middleware, async(req:AuthRequest, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({mesage : "Incorrect Input"})
        return;
    }

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: req.user.id
            }
        })

        res.json({roomId: room.id})
    } catch (error) {
        res.status(400).json({message: "Room already exists with this name"})
    }
})

app.listen(3001, () => console.log("App listening on port 3001"))