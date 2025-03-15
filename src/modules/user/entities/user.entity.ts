import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/modules/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @ApiProperty({ type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, unique: true })
  user: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  password: string;
  @ApiProperty()
  @Column({ type: 'varchar', default: Date.now() })
  created_at: string;
  @ApiProperty()
  @Column({ type: 'varchar', default: Date.now() })
  updated_at: string;
  @ApiProperty()
  @Column({ enum: ['admin', 'worker'], default: 'worker' })
  role: string;
  @ApiProperty()
  @OneToMany(() => Task, (task) => task.user)
  task: Task[];
}
