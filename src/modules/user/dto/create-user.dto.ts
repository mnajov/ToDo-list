import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 36)
  user: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 36)
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 36)
  refpassword: string;
  @ApiProperty({ enum: ['admin', 'worker'] })
  @IsNotEmpty()
  @IsString()
  @Length(4, 36)
  role: string;
}
