import { applyDecorators } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { Consumes } from '../enums/consumes.enum';

export const SwaggerConsumes = () => {
  return applyDecorators(ApiConsumes(Consumes.Form, Consumes.Multi, Consumes.Json));
};
