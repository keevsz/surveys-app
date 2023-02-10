import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSurveyDTO } from 'src/surveys/dto/CreateSurvey.dto';
import { Survey as SurveyEntity } from 'src/surveys/entities/Survey.entity';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';
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

  createSurvey(survey: any, authenticatedUser: User) {
    survey = {
      ...survey,
      author_id: authenticatedUser.id,
    };

    this.usersService.getUser(authenticatedUser.id.toString());
    const newSurvey = this.surveyRepository.create(survey);
    return this.surveyRepository.save(newSurvey);
  }

  getSurveyById(survey_id: number) {
    return this.surveyRepository.findOne({ where: { survey_id } });
  }

  updateSurvey() {}
}
