import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule ,TypeOrmModule.forFeature([OtpEntity, UserEntity, ProfileEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService , TypeOrmModule]
})
export class UserModule {}
