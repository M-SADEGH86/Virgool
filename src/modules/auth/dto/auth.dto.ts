import { IsEnum, IsString, Length } from 'class-validator';
import { AuthType } from '../enums/type.enum';
import { AuthMethod } from '../enums/method.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty()
  username: string;
  @ApiProperty({ enum: AuthType })
  @IsEnum(AuthType)
  type: AuthType;
  @ApiProperty({ enum: AuthMethod })
  @IsEnum(AuthMethod)
  method: AuthMethod;
}
