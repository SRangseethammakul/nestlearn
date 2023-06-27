import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as argon2 from 'argon2';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new User();
      newUser.fullName = createUserDto.fullName;
      newUser.email = createUserDto.email;
      newUser.password = await argon2.hash(createUserDto.password);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException('Email is duplicate', HttpStatus.CONFLICT);
      }
      throw new HttpException('API Error', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.usersRepository.find({ order: { id: 'desc' } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
