export interface AuthRequest {
  username?: string;
  email: string;
  password: string;
}

export interface UserAuth {
  username: string;
  token: string;
}
