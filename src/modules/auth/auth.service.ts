import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enums/type.enum';
import { AuthMethod } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entities/profile.entity';
import { OtpEntity } from '../user/entities/otp.entity';
import { AuthMessage, BadReqMessage, PublicMessage } from 'src/common/enums/message.enum';
import { randomInt } from 'crypto';
import { TokenService } from './token.service';
import { Response, Request } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { AuthResponseType } from './types/response';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    private readonly tokenService: TokenService,
    @Inject(REQUEST) private request: Request,
  ) {}
  async userExistence(authDto: AuthDto, res: Response) {
    let result: AuthResponseType;
    const { method, type, username } = authDto;
    switch (type) {
      case AuthType.Login:
        result = await this.login(method, username);
        return this.sendResponse(res, result);
      case AuthType.Register:
        result = await this.register(method, username);
        return this.sendResponse(res, result);
      default:
        throw new UnauthorizedException('');
    }
  }
  async login(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    let user: UserEntity = await this.checkExistUser(method, validUsername);
    if (!user) throw new UnauthorizedException(AuthMessage.NotFoundAccount);
    const otp = await this.saveOtp(user.id);
    const token = this.tokenService.createOtpToken({ userId: user.id });
    return {
      code: otp.code,
      token,
    };
  }
  async register(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    let user: UserEntity = await this.checkExistUser(method, validUsername);
    if (user) throw new ConflictException(AuthMessage.AlreadyExistAccount);
    if (method === AuthMethod.Username)
      throw new BadRequestException(BadReqMessage.InValidRegisterData);
    user = this.userRepository.create({
      [method]: username,
    });
    user = await this.userRepository.save(user);
    user.username = `m_${user.id}`;
    user = await this.userRepository.save(user);
    const otp = await this.saveOtp(user.id);
    const token = this.tokenService.createOtpToken({ userId: user.id });
    return {
      code: otp.code,
      token,
    };
  }
  async sendResponse(res: Response, result: AuthResponseType) {
    const { token, code } = result;
    res.cookie(CookieKeys.Otp, token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 2),
    });
    res.json({
      message: 'send otp',
      code: code,
    });
  }

  async saveOtp(userId: number) {
    const code: string = randomInt(10000, 99999).toString();
    let otp = await this.otpRepository.findOneBy({ userId });
    let existOtp = false;
    const expiresIn: Date = new Date(new Date().getTime() + 1000 * 60 * 2);
    if (otp) {
      existOtp = true;
      otp.code = code;
      otp.expires_in = expiresIn;
    } else {
      otp = this.otpRepository.create({
        code,
        expires_in: expiresIn,
        userId,
      });
    }
    otp = await this.otpRepository.save(otp);
    if (!existOtp) {
      await this.userRepository.update(
        { id: userId },
        {
          otpId: otp.id,
        },
      );
    }
    return otp;
  }
  async checkOtp(code: string) {
    const token = this.request.cookies?.[CookieKeys.Otp];
    if (!token) throw new UnauthorizedException(AuthMessage.ExpireCode);
    const { userId } = this.tokenService.verifyToken(token);
    const otp = await this.otpRepository.findOneBy({ userId });
    if (!otp) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const now = new Date();
    if (otp.expires_in < now) throw new UnauthorizedException(AuthMessage.ExpireCode);
    if (otp.code !== code) throw new UnauthorizedException(AuthMessage.TryAgain);
    const accessToken = this.tokenService.createAccessToken({userId})
    return {
      message: PublicMessage.LoggedIn,
      accessToken
    };
  }
  async checkExistUser(method: AuthMethod, username: string) {
    let user: UserEntity;
    if (method === AuthMethod.Phone) {
      user = await this.userRepository.findOneBy({ phone: username });
    } else if (method === AuthMethod.Email) {
      user = await this.userRepository.findOneBy({ email: username });
    } else if (method === AuthMethod.Username) {
      user = await this.userRepository.findOneBy({ username });
    } else {
      throw new BadRequestException(BadReqMessage.InValidLoginData);
    }
    return user;
  }
  usernameValidator(method: AuthMethod, username: string) {
    switch (method) {
      case AuthMethod.Email:
        if (isEmail(username)) return username;
        throw new BadRequestException('Email format is incorrect');
      case AuthMethod.Phone:
        if (isMobilePhone(username, 'fa-IR')) return username;
        throw new BadRequestException('mobile number is invalid');
      case AuthMethod.Username:
        return username;
      default:
        throw new UnauthorizedException('username data is inValid');
    }
  }
  async validateAccessToken (token:string) {
    const {userId} = this.tokenService.verifyAccessToken(token)
    const user = await this.userRepository.findOneBy({id: userId})
    if(!user) throw new UnauthorizedException(AuthMessage.LoginAgain) ;
    return user
  }
}
