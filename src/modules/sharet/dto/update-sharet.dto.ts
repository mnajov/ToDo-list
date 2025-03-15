import { PartialType } from '@nestjs/swagger';
import { CreateSharetDto } from './create-sharet.dto';

export class UpdateSharetDto extends PartialType(CreateSharetDto) {}
