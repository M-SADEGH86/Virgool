import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { SwaggerConfigInit } from './configs/swagger.config';
import * as cookieParser from 'cookie-parser';
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  const { PORT: port } = process.env;
  SwaggerConfigInit(app);
  app.listen(port, () => {
    console.log(`Swagger : http://localhost:${port}/swagger`);
  });
};
bootstrap();
