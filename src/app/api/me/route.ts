// src/app/api/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseJwt } from "@/utils/jwt";

export async function GET(request: NextRequest) {
  
  // Verificar todas las cookies
  const allCookies = request.cookies.getAll();
  
  const token = request.cookies.get("token")?.value;
  
  if (!token) {

    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = parseJwt(token);
    
    if (!decoded || !decoded.username) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = {
      username: decoded.username,
    };

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Token inválido" },
      { status: 400 }
    );
  }
}