'use client'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/authContext'
import Spinner from '@/components/ui/Spinner';
import Link from 'next/link';
import ProtectedPage from '@/components/ProtectedPage';


export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedPage>
      <main className="p-8 flex items-center justify-between">
        <div className='flex flex-col items-start'>
          <h1 className="text-3xl font-bold">Bienvenido a la Home</h1>
          <p>Hola, <strong>{user?.username}</strong>!</p>
        </div>
        <Link href="/dashboard" className="text-white">Dashboard</Link>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </main>
    </ProtectedPage>
  );
}
