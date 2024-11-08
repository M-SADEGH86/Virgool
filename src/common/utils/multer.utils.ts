import { Request } from 'express';
import { mkdirSync } from 'fs';
import { extname, join } from 'path';
import { ValidationMessage } from '../enums/message.enum';
import { BadRequestException } from '@nestjs/common';
export type CallBackDestination = (err: Error, destination: string) => void;
export type CallBackFileName = (err:Error , fileName:string) => void
export type MulterFile = Express.Multer.File;
export const MulterDestination = (fieldName: string) => {
  return (req: Request, file: MulterFile, cb: CallBackDestination) => {
    let path = join('public', 'uploads', fieldName);
    mkdirSync(path, { recursive: true });
    cb(null, path);
  };
};
export const MulterFileName = (req:Request , file:MulterFile , cb:CallBackFileName) => {
  const ext = extname(file.originalname).toLowerCase() ;
  if (!isValidImageFormat(ext)) {
    cb(new BadRequestException(ValidationMessage.InvalidImageFormat) , null)
  } else {
    const fileName = `${Date.now()}${ext}`
    cb(null , fileName)
  }
}
const isValidImageFormat = (ext:string) => {
  return [".png" , ".jpg" , ".jpeg"].includes(ext)
}