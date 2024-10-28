import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { CookieKeys } from 'src/common/enums/cookie.enum';

export const SwaggerConfigInit = (app:INestApplication) => {
  const document = new DocumentBuilder()
    .setTitle('Iran Khodro')
    .setDescription('BackEnd for iran khodro')
    .setVersion('V 0.0.1')
    .addBearerAuth(BearerConfig(),"Authorization")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app , document)
  SwaggerModule.setup("/swagger" , app , swaggerDocument)
};
export const BearerConfig = ():SecuritySchemeObject => {
  return {
    type: "http",
    in: "headers",
    bearerFormat : "JWT",
    scheme : "bearer"
  }
}