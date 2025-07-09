'use client'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/authContext'
import Spinner from '@/components/ui/Spinner';

export default function HomePage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="p-8 flex items-center justify-between">
      <div className='flex flex-col items-start'>
        <h1 className="text-3xl font-bold">Bienvenido a la Home</h1>
        <p>Hola, <strong>{user?.username}</strong>!</p>
      </div>
      <Button variant="outline" onClick={logout}>Logout</Button>
    </main>
  );
}
