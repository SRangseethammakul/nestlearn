import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return {
      id: newUser.id,
      fullName: newUser.fullName,
      permission: newUser.permission,
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('pagination')
  async findAllWithPagination(@Query() query: any) {
    return await this.usersService.findAllWithPagination(
      query.page,
      query.pageSize,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if (!result.affected) {
      throw new HttpException(`Can't delete`, HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'deleted',
    };
  }
}
