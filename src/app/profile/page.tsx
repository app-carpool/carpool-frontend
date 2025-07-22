'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import { ProfileHeader } from './ProfileHeader';
import { RoleSwithcer } from './RoleSwitcher';
import { RoleView } from './RoleView';

export default function ProfilePage() {
  const { user } = useAuth();
  const [role, setRole] = useState<'pasajero' | 'chofer'>('pasajero');

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto p-4">
      <ProfileHeader user={user} />
      <RoleSwithcer role={role} onChange={setRole} />
      <RoleView role={role} />
    </div>
  );
}
