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
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';
import { validate as isUuid } from 'uuid';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDTO) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(term: string) {
    let user: User;

    if (isUuid(term)) {
      user = await this.userRepository.findOne({ where: { id: term } });
    } else {
      user = await this.userRepository.findOne({ where: { username: term } });
      const queryBuilder = this.userRepository.createQueryBuilder('user');
      user = await queryBuilder
        .where('lower(username) =lower(:username)', {
          username: term,
        })
        .getOne();
    }

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async getFullUser(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      select: {
        password: true,
        username: true,
        age: true,
        email: true,
        id: true,
        isActive: true,
        lastname: true,
        name: true,
        surveys: true,
      },
    });
    return user;
  }

  async updateUser(id: string, user: UpdateUserDTO, authenticatedUser: User) {
    const userFound = await this.getUser(id.toString());
    let hashedPassword: string;

    if (authenticatedUser.id !== id)
      throw new HttpException('Invalid action', HttpStatus.FORBIDDEN);

    if (user.password) hashedPassword = bcrypt.hashSync(user.password, 10);

    if (user.username && user.username !== userFound.username) {
      const usernameExists = await this.getFullUser(user.username);
      if (usernameExists)
        throw new HttpException('Invalid username', HttpStatus.CONFLICT);
    }
    const updatedUser = Object.assign(userFound, {
      ...user,
      password: hashedPassword,
    });
    try {
      await this.userRepository.update({ id }, updatedUser);
      return updatedUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  private handleError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
