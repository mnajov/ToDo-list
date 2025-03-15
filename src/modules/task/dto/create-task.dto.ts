import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateTaskDto {
  @ApiProperty()
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsEnum(['started', 'completed', 'completed'])
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: ['started', 'completed', 'completed'] })
  status: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  douser: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  docreator: number;
  creator: User;
  user: User;
  @IsEmpty()
  updateat: string;
  @IsEmpty()
  createat: string;
}
