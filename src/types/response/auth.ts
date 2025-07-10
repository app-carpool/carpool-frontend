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
