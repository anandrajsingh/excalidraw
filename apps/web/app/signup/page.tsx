"use client"

import { useState } from "react";

async function signupUser(userData: { email: string, name: string, password: string }) {
    const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    const result = await response.json();
    return result;
}


export default function Signup() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        
        const result = await signupUser({ email, password, name });
        if(!result) return;

        
    };
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-6 m-2 bg-white rounded">
                <div className="p-2">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="p-2">
                    <input type="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="p-2">
                    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="pt-2">
                    <button className="bg-red-200 rounded p-2" onClick={() => handleSignup()}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}