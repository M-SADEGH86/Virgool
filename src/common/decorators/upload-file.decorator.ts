import { applyDecorators, ParseFilePipe, UploadedFiles } from '@nestjs/common';

export const UploadedOptionalFile = () => {
  return UploadedFiles(
    new ParseFilePipe({
      fileIsRequired: false,
      validators: [],
    }),
  );
};
