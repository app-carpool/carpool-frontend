'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

import { completeRegistrationSchema, CompleteRegistrationData } from "@/schemas/auth/completeRegistrationSchema"
import { completeRegistration, registerUser } from "@/services/authService"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import Spinner from "../ui/Spinner"

interface CompleteRegistrationFormProps {
  email: string
}

export function CompleteRegistrationForm({email}:CompleteRegistrationFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompleteRegistrationData>({
    resolver: zodResolver(completeRegistrationSchema),
  })

  const onSubmit = async (data: CompleteRegistrationData) => {
    setLoading(true)
    setError(null)
    try {
      await completeRegistration(email,data)
      router.push('/home')
    } catch (err) {
      setError('Error al registrar usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6 w-full">
      <div className="flex flex-col items-center text-center mb-2">
        <h1 className="font-outfit text-lg font-semibold">Crear una cuenta</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Nombre de usuario"
          type="text"
          {...register("username")}
          error={errors.username?.message}
        />

        <Input
          label="Apellido"
          type="text"
          {...register("lastname")}
          error={errors.lastname?.message}
        />

        <Input
          label="DNI"
          type="text"
          {...register("dni")}
          error={errors.dni?.message}
        />

        <Input
          label="Teléfono"
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="Contraseña"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          label="Confirmar contraseña"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button variant="primary" type="submit" className="w-full" disabled={loading || isSubmitting}>
          {loading ? <Spinner size={20} /> : "Registrarse"}
        </Button>

        <div className="flex items-center gap-2 text-gray-500">
          <div className="flex-1 h-px bg-gray-4/50" />
          <span className="text-sm font-inter">o</span>
          <div className="flex-1 h-px bg-gray-4/50" />
        </div>

        <Button variant="google" className="flex items-center gap-2 justify-center font-inter">
          <span className="text-xl"><FcGoogle /></span>
          Registrarse con Google
        </Button>

        <p className="w-full text-center text-sm text-gray-500 font-inter">
          Al hacer clic en continuar, aceptás nuestros
          <a href="/terms" className="mx-1 text-dark-2 font-medium">Términos de Servicio</a>
          y
          <a href="/privacy" className="text-dark-2 font-medium ml-1">Política de Privacidad</a>.
        </p>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </form>
    </div>
  )
}
