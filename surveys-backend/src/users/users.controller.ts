import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  ParseIntPipe,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/auth/LocalGuard.guard';
import { encodePassword } from 'src/services/bcrypt';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':term')
  async getUser(@Param('term') term: string) {
    return this.userService.getUser(term);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUserDto: UpdateUserDTO,
    @Req() req: Request,
  ) {
    const authenticatedUser = req.user as User;
    return this.userService.updateUser(id, updatedUserDto, authenticatedUser);
  }
}
