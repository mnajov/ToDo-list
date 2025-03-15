import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ACC_TOKEN, REF_TOKEN } from 'src/config/constanta';
import { ResData } from 'src/lib/ResData';
import { IloginType } from './type/login_type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: CreateAuthDto) {
    const user = await this.userService.findOneUser(dto.user);
    if (user?.['data']?.password !== dto.password)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    const payload = { id: user['data'].id, user: user['data'].user };
    const acc_token = await this.jwtService.signAsync(payload, {
      expiresIn: ACC_TOKEN.time,
      secret: ACC_TOKEN.secret,
    });
    const ref_token = await this.jwtService.signAsync(payload, {
      expiresIn: REF_TOKEN.time,
      secret: REF_TOKEN.secret,
    });
    delete user.data.password;

    return new ResData<IloginType>(200, 'login sucsess', {
      acc_token,
      ref_token,
      user: user.data,
    });
  }
}
