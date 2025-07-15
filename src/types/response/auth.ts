export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  messages: string[];
  state: string;
}

export interface RegisterResponse {
  data: null;
  messages: string[];
  state: string;
}

export interface GoogleLoginResponse {
  data: {
    accessToken: string;
    refreshToken: string | null;
    email: string;
    name: string;
    status: string;
    needsAction: boolean;
  };
  messages: string[];
  state: string;
};