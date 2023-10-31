import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
// import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'express-handlebars';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      defaultLayout: 'index',
      layoutsDir: 'views/layouts',
      partialsDir: 'views/partials',
      helpers: {
        ratings: (ratingArr: Array<{ rating: number }>) => {
          let ratings = 0;
          for (const rating of ratingArr) {
            ratings += rating.rating;
          }
          if (ratingArr.length > 0) return ratings / ratingArr.length;
          else return;
        },
        projDisplay: (
          projectsArr: Array<{
            project_name: string;
            client: string;
            start_date: string;
            end_date: string;
          }>,
        ) => {
          const projects = [];
          for (const project of projectsArr) {
            projects.push(project.project_name);
          }

          return projects.join(', ');
        },
      },
    }),
  );
  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

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
