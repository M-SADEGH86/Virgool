import { Request } from 'express';
import { mkdirSync } from 'fs';
import { join } from 'path';
export type CallBackFunction = (err: Error, destination: string) => void;
type MulterFile = Express.Multer.File;
export const MulterDestination = (fieldName: string) => {
  
  return (req: Request, file: MulterFile, callback: CallBackFunction) => {
    let path = join("public" , "uploads", fieldName);
    mkdirSync(path , {recursive:true})
    callback(null , path)
  }
};

export const MulterFileName  = (req:Request, file:MulterFile) => {}