import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getFullUser(username);
    if (!user) return null;

    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    delete user.password
    return isCorrectPassword ? user : null;
  }
}
