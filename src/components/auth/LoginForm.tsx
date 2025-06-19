'use client'

import { useState } from "react"
import type { LoginFormData } from '@/types/forms'
import { loginUser } from "@/services/authService"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { FcGoogle } from "react-icons/fc"

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await loginUser({ email, password })  // Llamás al servicio que ya tenés
    } catch (err) {
      setError('Error al iniciar sesión') // o err.message si tu servicio lo provee
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 w-full">
      <div className="flex flex-col items-center mb-2">
        <h1 className="font-outfit text-lg font-semibold">Inicia sesión en tu cuenta</h1>
        <p className="font-inter font-regular text-sm">Ingresa email y contraseña para iniciar sesión</p>
      </div>
      <div className="flex flex-col">
         <Input
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <Input
          label="Contraseña"
          type="password"
          autoComplete="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      
      <Button
        variant="primary"
        type="submit"
        disabled={loading}
        className="w-full mb-2"
      >
      {loading ? 'Cargando...' : 'Iniciar sesión'}
      </Button>

      <div className="flex items-center gap-2 text-gray-500 ">
        <div className="flex-1 h-px bg-gray-4/50" />
        <span className="text-sm font-inter">o</span>
        <div className="flex-1 h-px bg-gray-4/50" />
      </div>

      <Button variant="google" className="flex items-center gap-2 justify-center font-inter">
        <span className="text-xl"><FcGoogle/></span>
        Continuar con Google
      </Button>

      <p className="w-full text-center text-sm text-gray-500 font-inter">
        Al hacer clic en continuar, aceptás nuestros
        <a href="/terms" className="mx-1 text-dark-2 font-medium">Términos de Servicio</a>
        y
        <a href="/privacy" className="text-dark-2 font-medium ml-1">Política de Privacidad</a>.
      </p>


      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  )
}
