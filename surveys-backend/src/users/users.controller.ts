import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from '../auth/guards/local-guard.guard';

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

  @Put(':id')
  @UseGuards(AuthenticatedGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedUserDto: UpdateUserDTO,
    @GetUser() user: User,
  ) {
    return this.userService.updateUser(id, updatedUserDto, user);
  }
}
