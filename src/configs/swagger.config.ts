import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const SwaggerConfigInit = (app:INestApplication) => {
  const document = new DocumentBuilder()
    .setTitle('Virgool')
    .setDescription('BackEnd for Virgool')
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