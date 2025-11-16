"use client"

import axios from "axios";
import { useEffect, useState } from "react";

interface Room{
    roomId:string
}

async function getRooms(token:string){
    
    const response = await axios.get(`http://localhost:3001/room`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export default function Canvas(){

    const [rooms, setRooms] = useState<Room | null>(null)

    useEffect(() => {
        const fetchData = async() => {

            const token = localStorage.getItem("token")
            
            if(!token) return;
            
            const rooms = await getRooms(token)
            setRooms(rooms)
        }
        fetchData()
    })
    return (
        <div>
            rorm
        </div>
    )
}