import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtStrategy } from './straategiy';
import { JwtModule } from '@nestjs/jwt';
import { ACC_TOKEN } from 'src/config/constanta';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ global: true, secret: ACC_TOKEN.secret }),
  ],

  providers: [JwtStrategy, UserService],
})
export class SharetModule {}
