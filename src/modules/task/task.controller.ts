import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TaskOkResponseOpenApi } from './type/type-openApi';
import { BaseBadRequest } from '../user/type/type-OpenApi';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../sharet/authGuard';
import { Role } from 'src/common/roleDecorator';

@Controller('task')
@ApiBearerAuth()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userServise: UserService,
  ) {}
  @Post()
  @Role(['admin'])
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: TaskOkResponseOpenApi, status: 201 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const userRes = await this.userServise.findOne(createTaskDto.douser);
    createTaskDto.user = userRes['data'];
    createTaskDto.creator = req.user as User;

    return this.taskService.create(createTaskDto);
  }

  @Get()
  @Role(['admin'])
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: TaskOkResponseOpenApi, status: 200, isArray: true })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  findAll() {
    return this.taskService.findAll();
  }
  @Get(':id')
  @Role(['admin', 'worker'])
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: TaskOkResponseOpenApi, status: 200 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req?.user as User;
    const task = await this.taskService.findOne(+id);
    if (user['role'] === 'worker') {
      if (user.id !== task.data.user.id)
        throw new HttpException('bu sizga tegishli emas', 400);

      return task;
    }

    return task;
  }
  @ApiResponse({ type: TaskOkResponseOpenApi, status: 201 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }
  @ApiResponse({ type: TaskOkResponseOpenApi, status: 201 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
