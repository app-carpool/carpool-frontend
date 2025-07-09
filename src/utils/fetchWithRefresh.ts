export async function fetchWithRefresh(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  let res = await fetch(input, {
    ...init,
    credentials: 'include', // Necesario para que las cookies se envíen
  });

  // Si no hay error de autorización, devolvemos la respuesta directamente
  if (res.status !== 401) {
    return res;
  }

  console.warn('Token expirado. Intentando refrescar...');

  // Intentamos refrescar el token
  const refresh = await fetch('/api/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!refresh.ok) {
    console.error('No se pudo refrescar el token');
    throw new Error('Token inválido o expirado');
  }

  // Reintentamos la petición original
  return fetch(input, {
    ...init,
    credentials: 'include',
  });
}
