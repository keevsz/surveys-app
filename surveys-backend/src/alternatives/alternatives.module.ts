import { Module } from '@nestjs/common';
import { AlternativesService } from './alternatives.service';
import { AlternativesController } from './alternatives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alternative } from './entities/alternative.entity';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alternative]), QuestionsModule],
  controllers: [AlternativesController],
  providers: [AlternativesService],
})
export class AlternativesModule {}
