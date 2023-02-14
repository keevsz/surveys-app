import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/Survey.entity';
import { UsersModule } from 'src/users/users.module';
import { Question } from '../questions/entities/Question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question]), UsersModule],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
