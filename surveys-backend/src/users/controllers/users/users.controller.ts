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
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ) {
    return this.userService.updateUser(id, user);
  }
}
