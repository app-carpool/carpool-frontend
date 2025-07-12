import { LoginFormData, RegisterFormData } from "@/types/forms";
import { LoginResponse, RegisterResponse } from "@/types/response/auth";

// src/services/authService.ts
export const loginUser = async (data: LoginFormData & { recaptchaToken?: string }) => {
  try {
    const { recaptchaToken, ...loginData } = data;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (recaptchaToken) {
      headers['recaptcha'] = recaptchaToken;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(loginData),
      credentials: 'include',
    });

    const result = await res.json();
    
    if (res.ok && result.success) {
      return { success: true, ...result };
    } else {
      return { success: false, error: result.message || 'Login failed' };
    }
  } catch (error) {
    console.error('💥 Error in loginUser:', error);
    return { success: false, error: 'Network error' };
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
    const res = await fetch('/api/logout', {
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

