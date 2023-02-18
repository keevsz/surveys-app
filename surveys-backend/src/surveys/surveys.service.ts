import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateSurveyDto } from 'src/surveys/dto/create-survey.dto';
import { Question } from 'src/questions/entities/question.entity';
import { Alternative } from '../alternatives/entities/alternative.entity';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';

@Injectable()
export class SurveysService {
  private logger = new Logger();
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Alternative)
    private readonly alternativeRepository: Repository<Alternative>,
    private readonly userService: UsersService,
    private readonly dataSource: DataSource,
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

      const surveyDB = await this.surveyRepository.save(survey);

      return surveyDB;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getAllUserSurveys(userId: string, paginationDto: PaginationDto) {
    await this.userService.getUser(userId);
    const { limit = 10, offset = 0 } = paginationDto;
    const surveys = await this.surveyRepository.find({
      where: { user: { id: userId } },
      take: limit,
      skip: offset,
      relations: {
        user: true,
      },
    });
    return surveys;
  }

  async getAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    const surveys = await this.surveyRepository.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
      },
    });
    return surveys;
  }

  async getOne(surveyId: string) {
    const survey = await this.surveyRepository.findOne({
      where: { id: surveyId },
      relations: { user: true },
      select: {
        user: { id: true, username: true, pic: true },
      },
    });

    if (!survey)
      throw new NotFoundException(`Survey with id ${surveyId} not found`);

    return survey;
  }

  async update(surveyId: string, updateSurveyDto: UpdateSurveyDto, user: User) {
    const foundSurvey = await this.getOne(surveyId);
    if (foundSurvey.user.id !== user.id)
      throw new BadRequestException(`User not valid to update this survey`);

    const { questions, ...surveyDetails } = updateSurveyDto;

    const updatedSurvey = await this.surveyRepository.preload({
      id: surveyId,
      ...surveyDetails,
      user,
    });

    if (!updatedSurvey)
      throw new NotFoundException(`Survey with id ${surveyId} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      //? SURVEY -> QUESTIONS -> ALTERNATIVES
      if (questions) {
        await queryRunner.manager.delete(Question, { survey: surveyId });
        updatedSurvey.questions = questions.map((question) =>
          this.questionRepository.create({
            ...question,
            alternatives: question.alternatives.map((alternative) =>
              this.alternativeRepository.create(alternative),
            ),
          }),
        );
      }
      await queryRunner.manager.save(updatedSurvey);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      const surveySaved = await this.getOne(surveyId);
      return surveySaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async delete(surveyId: string) {
    const survey = await this.getOne(surveyId);
    return this.surveyRepository.remove(survey);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllSurveys() {
    const query = this.surveyRepository.createQueryBuilder('survey');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
