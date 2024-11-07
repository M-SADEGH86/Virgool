import { IsEnum, Length, IsOptional } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Length(3, 100)
  nick_name: string;
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Length(10, 200)
  bio: string;
  @ApiPropertyOptional({nullable : true , format : "binary"})
  image_profile: string;
  @ApiPropertyOptional({nullable : true , format : "binary"})
  bg_image: string;
  @ApiPropertyOptional({nullable : true, enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
  @ApiPropertyOptional({nullable:true,example : "2007-11-07T21:35:25.722Z"})
  birthday: Date;
  @ApiPropertyOptional({nullable : true})
  linkedin_profile: string;
  @ApiPropertyOptional({nullable : true})
  x_profile: string;
}
