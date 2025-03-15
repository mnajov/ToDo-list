import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class BaseMetaDataApi {
  @ApiProperty({ type: 'number' })
  status: number;
  @ApiProperty()
  message: string;
}

export class BaseBadRequest {
  @ApiProperty({ type: BaseMetaDataApi })
  meta: BaseMetaDataApi;
  @ApiProperty({ type: 'null' })
  data: null;
}

export class OkResponseUser {
  @ApiProperty({ type: User })
  data: User;

  @ApiProperty({ type: BaseMetaDataApi })
  meta: BaseMetaDataApi;
}
