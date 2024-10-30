import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers : [AuthService , JwtService, TokensService],
  exports : [AuthService, JwtService ,TokensService]
})
export class AuthModule {}
