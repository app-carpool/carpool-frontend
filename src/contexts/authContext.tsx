import { loginUser } from '@/services/authService';
import { LoginFormData } from '@/types/forms';
import { User } from '@/types/user';
import { parseJwt } from '@/utils/jwt';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Al montar, consulto si está logueado
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const login = async (data: LoginFormData) => {
    setLoading(true);
    const result = await loginUser(data);
    if (result.success && result.data) {
        const token = result.data.data; // asumí que el token viene aquí
        // Decodificamos el token para obtener user info
        const decoded = parseJwt(token);
        if (decoded) {
            const userFromToken: User = {
                username: decoded.username,
                role: decoded.role,
            };
            setUser(userFromToken);
            } else {
            setUser(null);
        }
    } else {
        setUser(null);
    }
        setLoading(false);
    };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
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
