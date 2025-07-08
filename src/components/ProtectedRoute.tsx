'use client'
import { useAuth } from '@/contexts/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import MobileNavbar from './navbar/MobileNavbar'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('ProtectedRoute user:', user, 'loading:', loading)
    if (!loading) {
        if (!user) {
        router.push(redirectTo)
        return
        }
        if (requiredRole && user.role !== requiredRole) {
        router.push('/unauthorized')
        return
        }
    }
  }, [user, loading, router, requiredRole, redirectTo])


  // Mostrar loading mientras verificamos
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  // Si el usuario no está autenticado, no mostrar contenido
  if (!user) {
    return null
  }

  // Si se requiere rol específico y no lo tiene
  if (requiredRole && user.role !== requiredRole) {
    return null
  }

  return (
    <>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      <main className="flex-1">{children}</main>
    </>
  )

}