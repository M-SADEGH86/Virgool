import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayloadType, CookiePayloadType } from "./types/payload";
import { AuthMessage } from "src/common/enums/message.enum";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService:JwtService
  ) {}
  createOtpToken (payload:CookiePayloadType) {
    const token = this.jwtService.sign(payload , { 
      secret : process.env.OTP_TOKEN_SECRET  ,
      expiresIn : 60 * 2 , 
    })
    return token
  }
  verifyToken (token:string):CookiePayloadType {
    try {
      return this.jwtService.verify(token , {
        secret : process.env.OTP_TOKEN_SECRET
      })
    } catch (err) {
      throw new UnauthorizedException(AuthMessage.TryAgain)
    }
  }
  createAccessToken (payload:AccessTokenPayloadType) {
    const token = this.jwtService.sign(payload , { 
      secret : process.env.ACCESS_TOKEN_SECRET ,
      expiresIn : "1y" , 
    })
    return token
  } 
  verifyAccessToken (token:string):AccessTokenPayloadType {
    try {
      return this.jwtService.verify(token , {
        secret : process.env.ACCESS_TOKEN_SECRET
      })
    } catch (err) {
      throw new UnauthorizedException(AuthMessage.LoginAgain)
    }
  }
}