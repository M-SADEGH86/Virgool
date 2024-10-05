import { Request } from "express"
import { mkdirSync } from "fs"
import { extname, join } from "path"
export type CallbackDestination = (err:Error , destination:string) => void
export type CallbackFileName = (err:Error , fileName: string) => void
export type MulterFile = Express.Multer.File
export const multerDestination = (fieldName: string) => {
  return (req:Request , file:MulterFile , callback:CallbackDestination):void => {
    let path = join(process.cwd() , "public" , "uploads" , fieldName) ;
    mkdirSync(path , {recursive : true})
    callback(null , path)
  }
}
export const multerFilename = (req:Request , file:MulterFile , callback:CallbackFileName) => {
  const ext = extname(file.originalname) ;
  const fileName = `${Date.now()}${ext}`
  callback(null , fileName)
}