// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LoginResponse } from "@/types/response/auth";
import { parseJwt } from "@/utils/jwt";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: LoginResponse = await res.json();

    if (!res.ok || data.state !== 'OK') {
      return NextResponse.json(
        {
          success: false,
          message: data.messages?.[0] || 'Error en login',
        },
        { status: res.status }
      );
    }
    
    const { accessToken, refreshToken } = data.data;
    const decoded: { username: string; iat: number; exp: number } = parseJwt(accessToken);

    const iat = Number(decoded.iat);
    const exp = Number(decoded.exp);
    const maxAge = exp > iat ? exp - iat : 60 * 60 * 2;

    const response = NextResponse.json({
      success: true,
      user: {
        username: decoded.username,
      }
    });

    // Cambiar sameSite a 'lax' para mejor compatibilidad
    response.cookies.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Error en la API de login",
        error: error.message,
      },
      { status: 500 }
    );
  }
}