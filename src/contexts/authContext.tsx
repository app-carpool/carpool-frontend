'use client'

import { loginUser } from '@/services/authService';
import { LoginFormData } from '@/types/forms';
import { User } from '@/types/user';
import { parseJwt } from '@/utils/jwt';
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
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      console.log('Decoded token:', decoded); // <-- agregalo
      if (decoded && decoded.username && decoded.role) {
        setUser({
          username: decoded.username,
          role: decoded.role,
        });
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);


  // ✅ Login: guardar token, decodificar y setear user
  const login = async (data: LoginFormData) => {
    setLoading(true);
    const result = await loginUser(data);
    console.log('result',result)
    if (result.success && result.data) {
      const token = result.data.data;
      localStorage.setItem('token', token);

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

  // ✅ Logout: limpiar token y user
  const logout = () => {
    localStorage.removeItem('token');
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
