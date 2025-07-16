import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas públicas
  const publicPaths = ['/login', '/register', '/api/login', '/api/refresh', '/complete-profile'];

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
        const newAccessToken = data.accessToken;

        if (newAccessToken) {
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

          // También actualizamos tokenValidUntil porque tenemos nuevo token válido
          const nextCheck = Date.now() + 5 * 60 * 1000; // 5 minutos en ms
          res.cookies.set('tokenValidUntil', nextCheck.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 300, // 5 minutos en segundos
          });

          return res;
        }
      }
    } catch (error) {
      console.error('Error refreshing token in middleware:', error);
    }

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

  // Verificamos si ya validamos recientemente el token
  const tokenValidUntilStr = req.cookies.get('tokenValidUntil')?.value;
  const now = Date.now();

  if (tokenValidUntilStr && Number(tokenValidUntilStr) > now) {
    return NextResponse.next();
  }
  /*

  // Si no está cacheado o expiró, hacemos la validación
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const verifyResponse = await fetch(`${apiUrl}/auth/verify-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (verifyResponse.ok) {
      const data = await verifyResponse.json();

      if (data.state === 'OK') {
        

        const res = NextResponse.next();

        // Guardamos la cookie para cachear la validación 5 minutos
        const nextCheck = now + 5 * 60 * 1000; // 5 minutos
        res.cookies.set('tokenValidUntil', nextCheck.toString(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 300, // 5 minutos en segundos
        });

        return res;
      } else {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    } else {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error('Error verificando firma del token:', error);
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }*/
 return NextResponse.next();
}
  

export const config = {
  matcher: ['/home', '/dashboard'],
};
