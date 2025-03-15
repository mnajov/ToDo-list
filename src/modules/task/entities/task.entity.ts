import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @ApiProperty({ type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['started', 'completed', 'notdone'],
    default: 'started',
  })
  status: string;

  @ApiProperty()
  @Column({ type: 'varchar', default: Date.now() })
  createat: string;

  @ApiProperty()
  @Column({ type: 'varchar', default: Date.now() })
  updateat: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.id)
  creator: User;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.task)
  user: User;
}
