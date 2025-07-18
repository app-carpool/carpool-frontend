'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider, useAuth } from '@/contexts/authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { usePathname } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';

interface AppProvidersProps {
  children: React.ReactNode;
}

function GlobalLoadingOverlay() {
  const { loading, initialized } = useAuth();
  const pathname = usePathname();

  // Rutas públicas donde no necesitamos mostrar loader
  const publicRoutes = ['/login', '/register', '/complete-profile'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Solo mostrar spinner durante la inicialización en rutas protegidas
  // o durante operaciones de login/logout
  const shouldShowSpinner = (!initialized && !isPublicRoute) || loading;

  if (!shouldShowSpinner) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/75">
      <Spinner/>
      <span>Cargando...</span>
    </div>
  );
}

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function AppProviders({ children }: AppProvidersProps) {
  if (!clientId) {
    console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID no está configurado');
  }

  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <GlobalLoadingOverlay />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}