import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
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
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() user: CreateUserDTO) {
    const userExists = await this.userService.getUserByUsername(user.username);
    if (userExists)
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    return this.userService.createUser(user);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const userExists = await this.userService.getUser(id);
    if (!userExists)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.userService.getUser(id);
  }

  //falta validar el update por usuario mismo
  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
    @Req() req: Request,
  ) {
    const userFound = await this.userService.getUser(id);
    let hashedPassword;

    const authenticatedUser = req.user as User;

    if (authenticatedUser.id !== id)
      throw new HttpException('Invalid action', HttpStatus.FORBIDDEN);

    if (!userFound)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user.password) hashedPassword = encodePassword(user.password);

    if (user.username && user.username !== userFound.username) {
      const usernameExists = await this.userService.getUserByUsername(
        user.username,
      );
      if (usernameExists)
        throw new HttpException('Invalid username', HttpStatus.CONFLICT);
    }
    const updatedUser = Object.assign(userFound, {
      ...user,
      password: hashedPassword,
    });
    return this.userService.updateUser(id, updatedUser);
  }
}
