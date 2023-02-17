import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alternative } from './entities/alternative.entity';
import { AlternativesController } from './alternatives.controller';
import { AlternativesService } from './alternatives.service';
@Module({
  imports: [TypeOrmModule.forFeature([Alternative])],
  controllers: [AlternativesController],
  providers: [AlternativesService],
})
export class AlternativesModule {}
