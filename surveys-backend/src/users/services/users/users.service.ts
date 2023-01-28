import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from 'src/users/entities/User.entity';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { SerializedUser } from 'src/types/SerializeUser';
import { plainToClass } from 'class-transformer';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { encodePassword } from 'src/services/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDTO) {
    const hashedPassword = encodePassword(user.password);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    return plainToClass(SerializedUser, savedUser);
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
    const hashedPassword = encodePassword(user.password);
    return this.userRepository.update(
      { id },
      { ...user, password: hashedPassword },
    );
  }

  getUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
