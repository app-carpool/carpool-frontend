'use client'

import { useState } from "react"
import type { LoginFormData } from '@/types/forms'
import { loginUser } from "@/services/authService"
import { Button } from "../ui/Button"

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 w-full">
      <div className="flex flex-col items-center">
        <h1 className="font-outfit text-lg font-semibold">Inicia sesión en tu cuenta</h1>
        <p className="font-inter font-regular text-sm">Ingresa email y contraseña para iniciar sesión</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-regular font-inter text-gray-700 dark:text-white mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md border font-inter border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white text-base"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-inter font-regular text-gray-700 dark:text-gray-200 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-md font-inter border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white text-base"
        />
      </div>

      <Button
        variant="primary"
        type="submit"
        disabled={loading}
        className={`mt-2 py-2 rounded-md text-white ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  )
}
