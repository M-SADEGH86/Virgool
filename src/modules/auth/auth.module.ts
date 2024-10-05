import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../user/entities/otp.entity';
import { ProfileEntity } from '../user/entities/profile.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity , ProfileEntity , UserEntity])],
  controllers: [AuthController],
  providers: [AuthService , JwtService , TokenService],
  exports : [AuthService , JwtService , TokenService , TypeOrmModule]
})
export class AuthModule {}
