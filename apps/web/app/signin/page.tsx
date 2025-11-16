"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

async function signInUser(userData: { email: string, password: string }) {
    const response = await fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    const result = await response.json();
    return result;
}

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter()

    const handleSignIn = async () => {
        try {
            const result = await signInUser({ email, password });

            if (!result || !result.token) {
                alert('Sign-in failed, please check your credentials.');
                return;
            }

            localStorage.setItem("token", result.token)
            router.push("/canvas")
        } catch (error) {
            console.error("Error during sign-in", error)
            alert("An error occured during sign in. Please try again later.")
        }
    };
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-6 m-2 bg-white rounded">
                <div className="p-2">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="p-2">
                    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="pt-2">
                    <button className="bg-red-200 rounded p-2" onClick={() => handleSignIn()}>Sign In</button>
                </div>
            </div>
        </div>
    )
}