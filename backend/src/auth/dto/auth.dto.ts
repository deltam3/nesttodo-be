import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
