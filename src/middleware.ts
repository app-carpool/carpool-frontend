import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas públicas (web + api login)
  const publicPaths = ['/login', '/register', '/api/login'];

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token) {
    if (pathname.startsWith('/api')) {
      // Para API responder 401 en vez de redirect
      return new NextResponse(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    } else {
      // Para rutas web redirigir a login
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
