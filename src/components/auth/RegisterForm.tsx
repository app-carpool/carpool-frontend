'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "@/services/authService"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"
import { 
  registerStep1Schema, 
  registerStep2Schema, 
  completeRegisterSchema,
  type RegisterStep1Data,
  type RegisterStep2Data,
  type CompleteRegisterData
} from "@/schemas/registerSchema"

export function RegisterForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Form para el paso 1
  const step1Form = useForm<RegisterStep1Data>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Form para el paso 2
  const step2Form = useForm<RegisterStep2Data>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      name: '',
      lastname: '',
      dni: '',
      phone: ''
    }
  })

  // Maneja el siguiente paso
  const handleNext = async (data: RegisterStep1Data) => {
    setError(null)
    setStep(2)
  }

  // Maneja el envío final
  const handleSubmit = async (data: RegisterStep2Data) => {
    setLoading(true)
    setError(null)

    try {
      // Combinar datos de ambos pasos
      const step1Data = step1Form.getValues()
      const completeData: CompleteRegisterData = {
        ...step1Data,
        ...data
      }

      const response = await registerUser(completeData)
      if (!response.success) {
        setError(response.message || "Error al registrar usuario")
        return
      }

      router.push('/login')
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
        <form onSubmit={step1Form.handleSubmit(handleNext)} className="flex flex-col gap-4">
          <div>
            <Input
              label="Nombre de usuario"
              type="text"
              {...step1Form.register('username')}
              error={step1Form.formState.errors.username?.message}
              
            />
          </div>

          <div>
            <Input
              label="Correo electrónico"
              type="email"
              {...step1Form.register('email')}
              error={step1Form.formState.errors.email?.message}
              
            />
          </div>

          <div>
            <Input
              label="Contraseña"
              type="password"
              {...step1Form.register('password')}
              error={step1Form.formState.errors.password?.message}
              
            />
          </div>

          <div>
            <Input
              label="Confirmar contraseña"
              type="password"
              {...step1Form.register('confirmPassword')}
              error={step1Form.formState.errors.confirmPassword?.message}
              
            />
          </div>

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
        </form>
      )}

      {step === 2 && (
        <form onSubmit={step2Form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Nombre"
                type="text"
                {...step2Form.register('name')}
                error={step2Form.formState.errors.name?.message}
                
              />
            </div>
            <div>
              <Input
                label="Apellido"
                type="text"
                {...step2Form.register('lastname')}
                error={step2Form.formState.errors.lastname?.message}
                
              />
            </div>
          </div>

          <div>
            <Input
              label="DNI"
              type="text"
              {...step2Form.register('dni')}
              error={step2Form.formState.errors.dni?.message}
              
            />
          </div>

          <div>
            <Input
              label="Teléfono"
              type="tel"
              {...step2Form.register('phone')}
              error={step2Form.formState.errors.phone?.message}
              
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
              Atrás
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full" 
              disabled={loading || step2Form.formState.isSubmitting}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </div>
        </form>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}