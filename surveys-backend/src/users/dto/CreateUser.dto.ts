import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  age?: number;
}
