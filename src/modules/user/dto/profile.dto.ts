import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, Length } from "class-validator"
import { Gender } from "../enums/gender.enum"

export class ProfileDto {
  @ApiPropertyOptional()
  @Length(3,50)
  nick_name: string
  @ApiPropertyOptional({nullable : true})
  @Length(10,200)
  bio: string
  @ApiPropertyOptional({nullable : true,format : "binary"})
  image_profile: string
  @ApiPropertyOptional({nullable : true , format:"binary"})
  bg_image: string
  @ApiPropertyOptional({nullable : true ,enum:Gender})
  @IsEnum(Gender)
  gender: Gender
  @ApiPropertyOptional({nullable : true , example:"2025-01-31T20:42:25.262Z"})
  birthday: Date ;
  @ApiPropertyOptional()
  linkedin_profile: string
}