import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException('exception error', 400);
    return 'qalay rasul ';
  }
}
