import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { Session } from './auth/entities/Auth.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(Session);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'SESSION_NESTJS',
      secret: 'keevsz',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
