'use client'

import { useState } from "react"
import { registerUser } from "@/services/authService"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastname: '',
    dni: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await registerUser(formData)
      router.push('/login')
    } catch (err) {
      setError('Error al registrar usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={step === 1 ? handleNext : handleSubmit} className="flex flex-col gap-4 p-6 w-full">
      <div className="flex flex-col items-center text-center mb-2">
        <h1 className="font-outfit text-lg font-semibold">Crear una cuenta</h1>
        {step === 1 && (
          <p className="font-inter font-regular text-sm">
            Registrate con tu email, nombre de usuario y contraseña
          </p>
        )}
        {step === 2 && (
          <p className="font-inter font-regular text-sm">
            Completá tus datos personales para finalizar el registro
          </p>
        )}
      </div>

      {step === 1 && (
        <>
          <Input
            label="Nombre de usuario"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            required
          />
          <Input
            label="Correo electrónico"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            required
          />

          <Button variant="primary" type="submit" className="w-full">
            Continuar
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
        </>
      )}

      {step === 2 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
            <Input
              label="Apellido"
              type="text"
              value={formData.lastname}
              onChange={(e) => handleChange('lastname', e.target.value)}
              required
            />
          </div>

          <Input
            label="DNI"
            type="text"
            value={formData.dni}
            onChange={(e) => handleChange('dni', e.target.value)}
            required
          />
          <Input
            label="Teléfono"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
              Atrás
            </Button>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </div>
        </>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  )
}
