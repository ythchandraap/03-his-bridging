import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin:
      // true,
      'http://localhost:5173',
  });
  app.use(helmet());
  app.use(
    session({
      secret: process.env.SALT_SESSION,
      name: 'sss_forward',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
