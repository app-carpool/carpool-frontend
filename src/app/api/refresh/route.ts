// app/api/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false, message: 'No refresh token' }, { status: 401 });
  }

  const response = await fetch(`${apiUrl}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();

  if (!response.ok || !data.data?.accessToken) {
    return NextResponse.json({ success: false, message: 'Refresh falló' }, { status: 401 });
  }

  const accessToken = data.data.accessToken;
  const decoded = JSON.parse(
    Buffer.from(accessToken.split('.')[1], 'base64').toString()
  );
  const maxAge = decoded.exp - decoded.iat;

  const res = NextResponse.json({ success: true });

  res.cookies.set('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  });

  return res;
}
