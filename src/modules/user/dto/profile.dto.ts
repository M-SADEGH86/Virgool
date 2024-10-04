import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, Length } from "class-validator";
import { Gender } from "../enum/gender.enum";

export class ProfileDto {
  @ApiPropertyOptional()
  @Length(3 , 50)
  nick_name: string;
  @ApiPropertyOptional()
  @Length(10 , 200)
  bio: string;
  @ApiPropertyOptional({ nullable : true,format : "binary"})
  image_profile: string;
  @ApiPropertyOptional({nullable : true , format : "binary"})
  bg_image: string;
  @ApiPropertyOptional({nullable : true , enum : Gender})
  gender: Gender;
  @ApiPropertyOptional({nullable : true , example : "1996-02-22T12:01:26.487Z"})
  birthday: Date
  @ApiPropertyOptional({nullable : true})
  x_profile: string
  @ApiPropertyOptional({nullable : true})
  linkedin_profile: string
  @ApiPropertyOptional()
  userId: number
}