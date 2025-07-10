import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas públicas
  const publicPaths = ['/login', '/register', '/api/login', '/api/refresh'];

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  // No hay token
  if (!token) {
    if (pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ message: 'No autorizado' }),
        {
          status: 401,
          headers: { 'content-type': 'application/json' },
        }
      );
    } else {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Token expirado
  if (isTokenExpired(token)) {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      // No hay refresh token, redirigir al login
      if (pathname.startsWith('/api')) {
        return new NextResponse(
          JSON.stringify({ message: 'Token expirado' }),
          {
            status: 401,
            headers: { 'content-type': 'application/json' },
          }
        );
      } else {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }

    // Intenta refresh del token
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${refreshToken}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.data?.accessToken;
        
        if (newAccessToken) {
          // Crear respuesta con nuevo token
          const res = NextResponse.next();
          
          const decoded = JSON.parse(
            Buffer.from(newAccessToken.split('.')[1], 'base64').toString()
          );
          const maxAge = decoded.exp - decoded.iat;

          res.cookies.set('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge,
          });

          return res;
        }
      }
    } catch (error) {
      console.error('Error refreshing token in middleware:', error);
    }

    // Si falla el refresh
    if (pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ message: 'Token expirado' }),
        {
          status: 401,
          headers: { 'content-type': 'application/json' },
        }
      );
    } else {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/dashboard', '/api/me', '/api/refresh'],
};