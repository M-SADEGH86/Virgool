import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { isJWT } from 'class-validator';
import { Request } from 'express';
import { AuthMessage } from 'src/common/enums/message.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const req: Request = httpContext.getRequest();
    const token = this.extractToken(req)
    req.user = await this.authService.validateAccessToken(token);
    return true;
  }
  protected extractToken(req: Request) {
    const { authorization } = req.headers;
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException(AuthMessage.LogginIsRequired);
    }
    const [bearer, token] = authorization?.split(' ');
    if (bearer?.toLowerCase() !== 'bearer' || !token || !isJWT(token)) {
      throw new UnauthorizedException(AuthMessage.LogginIsRequired);
    }
    return token
  }
}
