import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlternativesModule } from './alternatives/alternatives.module';
import { AnswersModule } from './answers/answers.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { QuestionsModule } from './questions/questions.module';
import { SeedModule } from './seed/seed.module';
import { SurveysModule } from './surveys/surveys.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    SurveysModule,
    QuestionsModule,
    UsersModule,
    AlternativesModule,
    CommonModule,
    SeedModule,
    AnswersModule,
  ],
})
export class AppModule {}
