import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alternative } from 'src/alternatives/entities/alternative.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { Question } from './entities/question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
@Module({
  imports: [TypeOrmModule.forFeature([Question, Alternative, Answer])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
