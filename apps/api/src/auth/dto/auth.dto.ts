export class RegisterDto {
  username!: string;
  password!: string;
}

export class LoginDto {
  username!: string;
  password!: string;
}

export class AuthResponseDto {
  access_token!: string;
  expires_in?: number;
  features?: string[];
}
