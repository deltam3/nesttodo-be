import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  // @IsEmail()
  // @IsEmpty()
  // email: string;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
