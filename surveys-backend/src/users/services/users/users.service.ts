import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from 'src/users/entities/User.entity';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { SerializedUser } from 'src/users/types/SerializeUser';
import { plainToClass } from 'class-transformer';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(user: CreateUserDTO) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return plainToClass(SerializedUser, user);
    });
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToClass(SerializedUser, user);
  }

  updateUser(id: number, user: UpdateUserDTO) {
    return this.userRepository.update({ id }, user);
  }
}
