import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Logout } from './decorators/logout.decorator';
import { LocalAuthGuard, AuthenticatedGuard } from './guards/local-guard.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: User) {
    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@GetUser() user: User) {
    return user;
  }

  //? se debería dejar el AuthenticatedGuard?
  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(
    @Logout()
    logout: boolean,
  ) {
    return logout && { msg: 'The user session has ended' };
  }
}
