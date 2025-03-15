import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  user: string;
  @ApiProperty()
  password: string;
}
