import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOtpDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { SwaggerConsumes } from 'src/common/decorators/consumes.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user-existence')
  @SwaggerConsumes()
  userExistence(@Body() authDto: AuthDto, @Res() res:Response) {
    return this.authService.userExistence(authDto , res);
  }
  
  @Post("/check-otp")
  @SwaggerConsumes()
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
