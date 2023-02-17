import { Module } from '@nestjs/common';
import { SurveysModule } from 'src/surveys/surveys.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SurveysModule, TypeOrmModule, UsersModule],
})
export class SeedModule {}
