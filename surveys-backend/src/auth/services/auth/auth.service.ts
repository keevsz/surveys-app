import { Inject, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/services/bcrypt';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) return null;
    const isCorrectPassword = comparePassword(password, user.password);
    return isCorrectPassword ? user : null;
  }
}
