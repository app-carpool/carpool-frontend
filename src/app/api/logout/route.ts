export async function POST() {
  // Cookie con Max-Age=0 para borrarla
  const expiredCookie = `token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

  return new Response(
    JSON.stringify({ message: "Logout exitoso" }),
    {
      status: 200,
      headers: {
        "Set-Cookie": expiredCookie,
        "Content-Type": "application/json",
      },
    }
  );
}