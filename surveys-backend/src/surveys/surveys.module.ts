import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { UsersModule } from 'src/users/users.module';
import { Question } from '../questions/entities/question.entity';
import { Alternative } from '../alternatives/entities/alternative.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Question, Alternative]),
    UsersModule,
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
  exports: [SurveysService, TypeOrmModule],
})
export class SurveysModule {}
