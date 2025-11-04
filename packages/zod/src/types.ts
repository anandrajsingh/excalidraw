import { z } from "zod"

export const SignupSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string()
})

export const SigninSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string()
})

export const CreateRoomSchema = z.object({
    name: z.string()
})