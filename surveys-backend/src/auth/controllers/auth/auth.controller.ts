import { Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import {
  AuthenticatedGuard,
  LocalAuthGuard,
} from 'src/auth/guards/auth/LocalGuard.guard';
import { SerializedUser } from 'src/types/SerializeUser';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return 'Successfully logged in';
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return plainToClass(SerializedUser, req.user);
  }
}
