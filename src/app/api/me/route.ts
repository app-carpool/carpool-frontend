import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'No hay JWT_SECRET' }, { status: 500 });
  }

  try {
    const decoded = jwt.verify(token, secret) as {
      username: string;
      role: string;
      exp: number;
    };

    return NextResponse.json({
      username: decoded.username,
      role: decoded.role,
    });
  } catch (err) {
    return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
  }
}
