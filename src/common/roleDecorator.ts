import { SetMetadata } from '@nestjs/common';
import { ROLE_DEC } from 'src/config/constanta';

export const Role = (roles: string[]) => SetMetadata(ROLE_DEC, roles);
