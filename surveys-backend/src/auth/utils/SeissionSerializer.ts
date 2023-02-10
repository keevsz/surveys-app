import { PassportSerializer } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/User.entity';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }
  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.userService.getUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
