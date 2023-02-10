import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, User as UserEntity } from 'src/users/entities/User.entity';
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
    try {
      const hashedPassword = encodePassword(user.password);
      const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword,
      });
      const savedUser = await this.userRepository.save(newUser);
      return plainToClass(SerializedUser, savedUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`Duplicated username in db`);
      }
    }
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return plainToClass(SerializedUser, user);
    });
  }

  async getUser(term: string) {
    let user: User;

    if (!isNaN(+term))
      user = await this.userRepository.findOne({ where: { id: +term } });

    if (!user && typeof term === 'string')
      user = await this.userRepository.findOne({ where: { username: term } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return plainToClass(SerializedUser, user);
  }

  async getFullUser(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async updateUser(id: number, user: UpdateUserDTO, authenticatedUser: User) {
    const userFound = await this.getUser(id.toString());
    let hashedPassword: string;

    if (authenticatedUser.id !== id)
      throw new HttpException('Invalid action', HttpStatus.FORBIDDEN);

    if (user.password) hashedPassword = encodePassword(user.password);

    if (user.username && user.username !== userFound.username) {
      const usernameExists = await this.getFullUser(user.username);
      if (usernameExists)
        throw new HttpException('Invalid username', HttpStatus.CONFLICT);
    }
    const updatedUser = Object.assign(userFound, {
      ...user,
      password: hashedPassword,
    });
    return this.userRepository.update({ id }, updatedUser);
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
