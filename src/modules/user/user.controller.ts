import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BaseBadRequest, OkResponseUser } from './type/type-OpenApi';
import { Role } from 'src/common/roleDecorator';
import { JwtAuthGuard } from '../sharet/authGuard';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Role(['admin'])
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: OkResponseUser, status: 201 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  async create(@Body() createUserDto: CreateUserDto) {
    const isUser = await this.userService.findOneUser(createUserDto.user);
    if (isUser['data']) throw new HttpException('user aleredi exist', 400);
    if (createUserDto.password !== createUserDto.refpassword)
      throw new HttpException('pasword bir xil emas!!', 400);
    return this.userService.create(createUserDto);
  }

  @Get()
  @Role(['admin'])
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: OkResponseUser, isArray: true, status: 200 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  findAll() {
    return this.userService.findAll();
  }
  // @ApiQuery({ name: 'number' })
  // @ApiHeader({ name: 'name' })
  // @ApiParam({ name: 'parmasss' })
  @Get(':id')
  @Role(['admin'])
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: OkResponseUser, status: 200 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @ApiResponse({ type: OkResponseUser, status: 201 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Delete(':id')
  @Role(['admin'])
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: OkResponseUser, status: 201 })
  @ApiResponse({ type: BaseBadRequest, status: 400 })
  @ApiResponse({ type: BaseBadRequest, status: 404 })
  @ApiResponse({ type: BaseBadRequest, status: 500 })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
