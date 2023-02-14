import { Controller, Post, Get, UseGuards } from '@nestjs/common';

import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/entities/User.entity';
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
}
