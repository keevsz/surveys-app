import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSurveyDTO } from 'src/surveys/dto/CreateSurvey.dto';
import { Survey as SurveyEntity } from 'src/surveys/entities/Survey.entity';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
    private usersService: UsersService,
  ) {}

  getSurveys() {
    return this.surveyRepository.find();
  }

  createSurvey(survey: CreateSurveyDTO, user: User) {
    const userFound = this.usersService.getUser(user.id);

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newSurvey = this.surveyRepository.create(survey);
    return this.surveyRepository.save(newSurvey);
  }

  getSurveyById(survey_id: number) {
    return this.surveyRepository.findOne({ where: { survey_id } });
  }

  updateSurvey() {}
}
