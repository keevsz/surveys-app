import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SurveysModule } from './surveys/surveys.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { AlternativesModule } from './alternatives/alternatives.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    SurveysModule,
    QuestionsModule,
    UsersModule,
    AlternativesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
