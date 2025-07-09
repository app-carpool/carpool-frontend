import { NextRequest, NextResponse } from "next/server";
import { isValidJWT } from "./utils/jwt";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas públicas (web + api login)
  const publicPaths = ['/login', '/register', '/api/login'];

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token || !isValidJWT(token)) {
    if (pathname.startsWith('/api')) {
      return new NextResponse(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    } else {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/api/me'],
};