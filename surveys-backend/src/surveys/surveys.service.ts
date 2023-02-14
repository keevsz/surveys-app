import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { User } from 'src/users/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from 'src/surveys/dto/CreateSurvey.dto';
import { Question } from 'src/questions/entities/question.entity';
import { Alternative } from '../alternatives/entities/alternative.entity';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Alternative)
    private readonly alternativeRepository: Repository<Alternative>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto, user: User) {
    try {
      const { questions = [], ...surveyDetails } = createSurveyDto;

      const survey = this.surveyRepository.create({
        ...surveyDetails,
        questions: questions.map((question) =>
          this.questionRepository.create({
            ...question,
            alternatives: question.alternatives.map((alternative) =>
              this.alternativeRepository.create(alternative),
            ),
          }),
        ),
        user,
      });
      console.log(survey);

      const surveyDB = await this.surveyRepository.save(survey);

      return surveyDB;
    } catch (error) {
      console.log(error);
    }
  }
}
