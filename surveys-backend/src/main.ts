import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { Session } from './auth/entities/auth.entity';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:5173', credentials: true },
  });
  const logger = new Logger('Main');
  const sessionRepository = app.get(DataSource).getRepository(Session);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(
    session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 15 * 86400000,
        httpOnly: false,
        secure: false,
        expires: new Date(Date.now() + 15 * 86400000),
        sameSite: 'lax',
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
