import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { Session } from './auth/entities/Auth.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:5173', credentials: true },
  });
  const sessionRepository = app.get(DataSource).getRepository(Session);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
        secure: false,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: 'lax',
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT);
}
bootstrap();
