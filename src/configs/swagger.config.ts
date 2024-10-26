import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CookieKeys } from 'src/common/enums/cookie.enum';

export const SwaggerConfigInit = (app:INestApplication) => {
  const document = new DocumentBuilder()
    .setTitle('Iran Khodro')
    .setDescription('BackEnd for iran khodro')
    .setVersion('V 0.0.1')
    .addCookieAuth(CookieKeys.AccessToken , {type : "http" , in: "header" , })
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app , document)
  SwaggerModule.setup("/swagger" , app , swaggerDocument)
};
