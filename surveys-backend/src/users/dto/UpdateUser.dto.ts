import { MinLength } from 'class-validator';

export class UpdateUserDTO {
  @MinLength(6)
  username: string;

  @MinLength(6)
  password: string;

  state: boolean;
}
