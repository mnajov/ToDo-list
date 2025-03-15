import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ResData } from 'src/lib/ResData';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}
  async create(Dto: CreateTaskDto) {
    const data = this.taskRepo.create(Dto);
    const creatData = await this.taskRepo.save(data);
    return new ResData(201, 'sucsses created', creatData);
  }

  async findAll() {
    const data = await this.taskRepo.find({
      relations: { creator: true, user: true },
    });

    return new ResData(200, 'sucsess', data);
  }

  async findOne(id: number) {
    const data = await this.taskRepo.findOne({
      where: { id },
      relations: { user: true, creator: true },
    });
    if (!data) throw new HttpException('task not foud', 404);
    return new ResData(200, 'sucsses', data);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const data = await this.taskRepo.findOne({ where: { id } });
    if (!data) throw new HttpException('task not foud', 404);
    await this.taskRepo.update(id, updateTaskDto);
    return new ResData(201, 'upadte sucsses', data);
  }

  async remove(id: number) {
    const data = await this.taskRepo.findOne({ where: { id } });
    if (!data) throw new HttpException('task not foud', 404);
    await this.taskRepo.delete(id);
    return new ResData(201, 'deleted task', data);
  }
}
