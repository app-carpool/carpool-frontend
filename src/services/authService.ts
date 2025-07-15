import { LoginFormData, RegisterFormData } from "@/types/forms";
import { GoogleLoginResponse, LoginResponse, RegisterResponse } from "@/types/response/auth";

// src/services/authService.ts
export const loginUser = async (data: LoginFormData): Promise<{
  success: boolean;
  data?: LoginResponse;
  error?: string;
}> => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const result = await res.json();

    if (res.ok && result.success) {
      return { success: true, data: result };
    } else {
      return { success: false, error: result.message || 'Login failed' };
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Network error' };
  }
};

export const loginWithGoogle = async (idToken: string): Promise<{ success: boolean; data?: GoogleLoginResponse['data']; error?: string }> => {
 
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ idToken }),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.message || 'Fallo login con Google' };
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error de red' };
  }
};


export async function registerUser(data: RegisterFormData): Promise<{
    success:boolean;
    data?:RegisterResponse;
    message?: string}
> {
    try {
        const res = await fetch('/api/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        if (!res.ok){
            throw new Error('Datos inválidos')
        }

        const response: RegisterResponse = await res.json();

        return {success: true, data: response}
    } catch (err: any) {
        return {success: false, message: err.message}
    }
}

export async function logoutUser(): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Error al cerrar sesión');
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

