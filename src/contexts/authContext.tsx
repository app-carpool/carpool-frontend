'use client'

import { loginUser, logoutUser } from '@/services/authService';
import { LoginFormData } from '@/types/forms';
import { User } from '@/types/user';
import { parseJwt } from '@/utils/jwt';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me', {
          method: 'GET',
          credentials: 'include',
        });

        const json = await res.json();

        if (res.ok && json.user) {
          setUser({
            username: json.user.username,
            role: json.user.role,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error cargando usuario desde cookie:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);




  const login = async (data: LoginFormData) => {
    setLoading(true);
    const result = await loginUser(data);
    console.log('result', result);

    if (result.success) {
      //Pedimos el usuario desde la cookie vía /api/me
      try {
        const res = await fetch('/api/me', {
          method: 'GET',
          credentials: 'include',
        });

        const json = await res.json();

        if (res.ok && json.user) {
          setUser({
            username: json.user.username,
            role: json.user.role,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error al obtener el usuario desde /api/me', err);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  };


  // Logout: limpiar token y user
  const logout = async () => {
    await logoutUser(); // Borra la cookie
    setUser(null);      // Limpia el estado local
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
