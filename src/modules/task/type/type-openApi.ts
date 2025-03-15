import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { BaseMetaDataApi } from 'src/modules/user/type/type-OpenApi';
import { User } from 'src/modules/user/entities/user.entity';

export class TaskOkResponseOpenApi {
  @ApiProperty({ type: Task })
  data: Task;
  @ApiProperty({ type: BaseMetaDataApi })
  meta: BaseMetaDataApi;
}
