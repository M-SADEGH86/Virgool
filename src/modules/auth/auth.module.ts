import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from '../user/entities/user.entity';
// import { ProfileEntity } from '../user/entities/profile.entity';
// import { OtpEntity } from '../user/entities/otp.entity';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers : [AuthService]
})
export class AuthModule {}
