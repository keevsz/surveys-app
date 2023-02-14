import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { SurveysModule } from 'src/surveys/surveys.module';
import { Alternative } from 'src/alternatives/entities/alternative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Alternative])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
