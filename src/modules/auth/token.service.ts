import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CookiePayloadType } from "./types/payload";

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
}