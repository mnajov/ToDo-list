import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ILoginResData } from './type/login_type';
import { BaseBadRequest } from '../user/type/type-OpenApi';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ type: ILoginResData, status: 200 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  login(@Body() dot: CreateAuthDto) {
    return this.authService.login(dot);
  }
}
