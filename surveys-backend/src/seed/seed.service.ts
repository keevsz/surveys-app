import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveysService } from 'src/surveys/surveys.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private readonly surveyService: SurveysService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const users = await this.insertUsers();
    await this.insertNewSurveys(users);
    return 'Seed executed';
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach((user) =>
      users.push(
        this.userRepository.create({
          ...user,
          password: bcrypt.hashSync(user.password, 10),
        }),
      ),
    );
    const dbUsers = await this.userRepository.save(users);
    return dbUsers;
  }

  private async deleteTables() {
    await this.surveyService.deleteAllSurveys();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertNewSurveys(user: User[]) {
    const surveys = initialData.surveys;

    const insertPromises = [];

    surveys.forEach((survey, i) => {
      insertPromises.push(this.surveyService.create(survey, user[Number(i % 2 === 0)]));
    });
    await Promise.all(insertPromises);

    return true;
  }
}
