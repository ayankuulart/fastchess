import { IsString, IsInt } from 'class-validator';

export class SignInData {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
