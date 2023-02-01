import { IsOptional, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @MinLength(6)
  username?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  state?: boolean;
}
