import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOtpDto } from './dto/auth.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { Response , Request} from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/user-existence')
  @ApiConsumes( SwaggerConsumes.UrlEncoded , SwaggerConsumes.Json , SwaggerConsumes.MultipartData)
  userExistence(@Body() authDto: AuthDto , @Res() res:Response) {
    return this.authService.userExistence(authDto , res)
  }
  @Post("/check-otp")
  @ApiConsumes(SwaggerConsumes.UrlEncoded , SwaggerConsumes.Json , SwaggerConsumes.MultipartData)
  checkOtp(@Body() checkOtpDto:CheckOtpDto) {
    return this.authService.checkOtp(checkOtpDto.code)
  }
  @Get("/check-login")
  checkLogin (@Req() req:Request) {
    return req.user
  }
}
