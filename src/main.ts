import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
// import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
// import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.enableCors();
  app.use(cors({ origin: '*' }));
  app.use(
    session({
      secret: 'session_secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 300000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
