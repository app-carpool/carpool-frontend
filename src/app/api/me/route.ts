import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { parseJwt } from "@/utils/jwt"; // Tu helper para decodificar el token

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = parseJwt(token);

    if (!decoded || !decoded.username || !decoded.role) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = {
      username: decoded.username,
      role: decoded.role,
    };

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Token inválido" },
      { status: 400 }
    );
  }
}
