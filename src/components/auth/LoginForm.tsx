'use client'

import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { LoginData, loginSchema } from "@/schemas/auth/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/authContext" 
import Spinner from "../ui/Spinner"

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login, loading } = useAuth() 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginData) => {
    setError(null)
    try {
      await login(data)
      router.push('/home') // 👈 redireccioná después del login
    } catch (err) {
      setError('Error al iniciar sesión')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6 w-full">
      <div className="flex flex-col items-center text-center mb-2">
        <h1 className="font-outfit text-lg font-semibold">Inicia sesión en tu cuenta</h1>
        <p className="font-inter font-regular text-sm">Ingresa email y contraseña para iniciar sesión</p>
      </div>

      <div className="flex flex-col">
        <Input
          label="Nombre de usuario"
          type="text"
          autoComplete="username"
          {...register('username')}
          error={errors.username?.message}
        />
      </div>

      <div className="flex flex-col">
        <Input
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <Button
        variant="primary"
        type="submit"
        disabled={loading}
        className="w-full mb-2"
      >
        {loading ? (
          <span className="flex items-center justify-center"><Spinner size={20} /></span>
          
        ) : (
          'Iniciar sesión'
        )}
      </Button>

      <div className="flex items-center gap-2 text-gray-500 ">
        <div className="flex-1 h-px bg-gray-4/50" />
        <span className="text-sm font-inter">o</span>
        <div className="flex-1 h-px bg-gray-4/50" />
      </div>

      <Button variant="google" className="flex items-center gap-2 justify-center font-inter">
        <span className="text-xl"><FcGoogle /></span>
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
