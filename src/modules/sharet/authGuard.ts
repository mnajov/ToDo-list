import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_DEC } from 'src/config/constanta';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    const roles = this.reflector.get<string[]>(ROLE_DEC, context.getHandler());
    if (!roles) return true;
    const req = context.switchToHttp().getRequest();
    if (roles.includes(req?.user.role)) return true;

    throw new HttpException('siznin Rolingiz togri kelmaydi', 401);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
