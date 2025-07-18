'use client'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/authContext'
import Spinner from '@/components/ui/Spinner';
import Link from 'next/link';
import ProtectedPage from '@/components/ProtectedPage';


export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedPage>
      <main>
        profile
      </main>
    </ProtectedPage>
  );
}
