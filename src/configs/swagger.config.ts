import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const SwaggerConfigInit = (app: INestApplication) => {
  const document = new DocumentBuilder()
    .setTitle('Virgool')
    .setVersion('V 0.0.1')
    .setDescription(
      'Project Course for building api with NestJS and create BackEnd For Virgool Site',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/swagger', app, swaggerDocument);
};
