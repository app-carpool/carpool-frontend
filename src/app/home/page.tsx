'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/authContext'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login') // Redirige al login
  }

  return (
    <ProtectedRoute>
      <main className="p-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">Bienvenido a la Home</h1>
            {user && (
              <p className="text-lg">
                Hola, <strong>{user.username}</strong>! Tu rol es: <em>{user.role}</em>.
              </p>
            )}
        </div>
        <Button
          variant='outline'
          onClick={handleLogout}
          >
          Logout
        </Button>
      </main>
    </ProtectedRoute>
  )
}
