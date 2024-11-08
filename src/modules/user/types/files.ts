import { MulterFile } from "src/common/utils/multer.utils"

export type profileImages = {
  image_profile:MulterFile[],
  bg_image: MulterFile[]
}