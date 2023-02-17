import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateReqAnswerDto } from './dto/create-req-answer.dto';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';

@Injectable()
export class AnswersService {
  private logger = new Logger();
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}
  async create(createAnswerDto: CreateReqAnswerDto, user: User) {
    try {
      const { answers, surveyId } = createAnswerDto;
      //! Verificación
      const savedAnswers = [];
      answers.map((answer) => {
        savedAnswers.push(
          this.answerRepository.create({
            ...answer,
            surveyId,
            user,
          }),
        );
      });
      const answersDb = await this.answerRepository.save(savedAnswers);
      return answersDb;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23503') throw new BadRequestException(error.detail);

    this.logger.error(error.detail);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
