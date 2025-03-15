import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACC_TOKEN } from 'src/config/constanta';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userSevice: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACC_TOKEN.secret,
    });
  }

  async validate(payload: { id: number; user: string }) {
    let user: User | null = null;

    user = (await this.userSevice.findOne(payload.id))?.data;

    return user;
  }
}
