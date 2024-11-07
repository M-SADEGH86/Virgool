import { IsEnum, Length, IsOptional } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Length(3, 100)
  nick_name: string;
  @ApiPropertyOptional({ nullable: false })
  @IsOptional()
  @Length(10, 200)
  bio: string;
  @ApiPropertyOptional()
  image_profile: string;
  @ApiPropertyOptional()
  bg_image: string;
  @ApiProperty({ required: false, enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
  @ApiPropertyOptional()
  birthday: Date;
  @ApiPropertyOptional()
  linkedin_profile: string;
  @ApiPropertyOptional()
  x_profile: string;
}
