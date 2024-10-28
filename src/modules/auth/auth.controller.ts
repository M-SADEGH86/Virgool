import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { Consumes } from 'src/common/enums/consumes.enum';
import { Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user-existence')
  @ApiConsumes(Consumes.Form, Consumes.Json, Consumes.Multi)
  userExistence(@Body() authDto: AuthDto, @Res() res:Response) {
    return this.authService.userExistence(authDto , res);
  }
}
