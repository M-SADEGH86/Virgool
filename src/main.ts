import {NestFactory} from "@nestjs/core" ;
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./modules/app/app.module";
import { SwaggerConfigInit } from "./configs/swagger.config";
import { NestExpressApplication } from "@nestjs/platform-express";
const bootstrap = async () => {
  const app= await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets("public")
  const {PORT:port} = process.env
  SwaggerConfigInit(app)
  app.listen(port , () => {
    console.log(`Swagger : http://localhost:${port}/swagger`)
  })
}
bootstrap()