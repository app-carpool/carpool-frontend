'use client'

import { loginUser, loginWithGoogle, logoutUser } from '@/services/authService';
import { LoginFormData } from '@/types/forms';
import { User } from '@/types/user';
import { fetchWithRefresh } from '@/lib/http/authInterceptor';
import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
  loginGoogle: (idToken: string) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Rutas públicas donde no necesitamos autenticación
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Función para obtener el usuario
  const fetchUser = async () => {
    try {
      const res = await fetchWithRefresh('/api/me');
      const json = await res.json();

      if (res.ok && json.user) {
        setUser({ username: json.user.username });
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (err) {
      console.error('Error cargando usuario:', err);
      setUser(null);
      return false;
    }
  };

  // Inicializar usuario al cargar la app (solo si no es ruta pública)
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Solo intentar obtener el usuario si no estamos en una ruta pública
      if (!isPublicRoute) {
        await fetchUser();
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, [isPublicRoute]);

  const login = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await loginUser(data);
      if (result.success) {
        await fetchUser();
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async (idToken: string) => {
    setLoading(true);
    try {
      const result = await loginWithGoogle(idToken);
      if (result.success) {
        await fetchUser();
        if (result.data?.needsAction) {
          router.push('/complete-profile');
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally{
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true);
    await logoutUser();
    setUser(null);
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}