import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

export abstract class IloginType {
  @ApiProperty()
  acc_token: string;
  @ApiProperty()
  ref_token: string;
  @ApiProperty({ type: User })
  user: User;
}

export class IloginMeta {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
}

export class ILoginResData {
  @ApiProperty()
  data: IloginType;
  @ApiProperty()
  meta: IloginMeta;
}
