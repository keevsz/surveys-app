import { Module } from '@nestjs/common';
import { QuestionsController } from './questions/controllers/questions/questions.controller';
import { QuestionsService } from './questions/services/questions/questions.service';
import { SurveysController } from './controllers/surveys/surveys.controller';
import { SurveysService } from './services/surveys/surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/Survey.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [QuestionsController, SurveysController],
  providers: [QuestionsService, SurveysService],
  imports: [TypeOrmModule.forFeature([Survey]), UsersModule],
})
export class SurveysModule {}
