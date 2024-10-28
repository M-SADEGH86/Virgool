import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOtpDto } from './dto/auth.dto';
import { Consumes } from 'src/common/enums/consumes.enum';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user-existence')
  @ApiConsumes(Consumes.Form, Consumes.Json, Consumes.Multi)
  userExistence(@Body() authDto: AuthDto, @Res() res:Response) {
    return this.authService.userExistence(authDto , res);
  }
  
  @Post("/check-otp")
  @ApiConsumes(Consumes.Form,Consumes.Json,Consumes.Multi)
  checkOtp (@Body() checkOtpDto:CheckOtpDto) {
    return this.authService.checkOtp(checkOtpDto.code)
  }

  @Get("/check-login")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("Authorization")
  checkAuth (@Req() req:Request) {
    return req.user
  }
}
