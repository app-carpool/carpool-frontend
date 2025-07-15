'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface AppProvidersProps {
  children: React.ReactNode;
}

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
