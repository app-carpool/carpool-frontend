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

    // Si el backend respondió con error (por status)
    if (!res.ok || data.state !== 'success') {
      return NextResponse.json(
        {
          success: false,
          message: data.messages?.[0] || 'Error en login',
        },
        { status: res.status }
      );
    }

    const token = data.data;
    const decoded = parseJwt(token);
    const maxAge = decoded.exp - decoded.iat;

    // Guardamos el token como cookie HttpOnly
    const response = NextResponse.json({ success: true });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: maxAge, 
    });

    return response;
  } catch (error: any) {
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
