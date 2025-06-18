'use client'

import { useState } from "react"

import type { LoginFormData } from '@/types/forms'

export function LoginForm({onSubmit}:{ onSubmit: (data: LoginFormData)=>void}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({email, password})
    }


    return(
        <form onSubmit={handleSubmit}>
            
        </form>
    )
}