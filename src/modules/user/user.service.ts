import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResData } from 'src/lib/ResData';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async create(Dto: CreateUserDto) {
    const data = this.repository.create(Dto);
    const resdata = await this.repository.save(data);
    return new ResData<User>(201, 'created', resdata);
  }

  async findAll() {
    const data = await this.repository.find({ relations: { task: true } });
    return new ResData<User[]>(200, 'sucsess', data);
  }

  async findOne(id: number): Promise<ResData<User>> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return new ResData<User>(200, 'sucsses', data);
  }
  async findOneUser(user: string): Promise<ResData<User>> {
    const data = await this.repository.findOne({
      where: { user },
      relations: { task: true },
    });
    return new ResData<User>(200, 'sucsses', data);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userData = await this.repository.findOne({ where: { id } });
    if (!userData) throw new HttpException('user nut fund', 404);
    const createuser = Object.assign(userData, updateUserDto);
    await this.repository.save(createuser);
    return new ResData<User>(201, 'updated user', userData);
  }

  async remove(id: number) {
    const userData = await this.repository.findOne({ where: { id } });
    if (!userData) throw new HttpException('user nut fund', 404);
    await this.repository.delete(id);
    return new ResData<User>(201, 'deleted user', userData);
  }
}
