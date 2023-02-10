import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/Question.entity';
import { SurveysModule } from 'src/surveys/surveys.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), SurveysModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
