import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as passport from 'passport'
import * as session from 'express-session'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }))


  app.use(passport.initialize())
  app.use(passport.session())

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    credentials: true
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
