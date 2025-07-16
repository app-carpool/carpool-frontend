'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/authContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  console.log('Site key:', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GoogleReCaptchaProvider 
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'body',
        }}
      >
      <AuthProvider>
        {children}
      </AuthProvider>
    </GoogleReCaptchaProvider>
    </ThemeProvider>
  );
}
