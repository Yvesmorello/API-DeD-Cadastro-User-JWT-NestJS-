import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, BadRequestException, NotFoundException, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserNotFoundException } from '../exceptions/userNotFoundException';
import { User } from './interface/user.interface';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userService.create(createUserDto);
      return createdUser; 
    } catch (error) {
      throw new ConflictException('Erro ao criar usuário.');
    }
  }

  @Get('/username/:username')
  async findByName(@Param('username') username: string) {
    try {
      const user = await this.userService.findByName(username);
      if (!user) {
        throw new NotFoundException('Usuario não encontrado.');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar usuario.');
    }
  }


  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar os usuarios.');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new UserNotFoundException(id);
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Erro ao buscar usuario por id.');
    }
  }

  @Put(':id') 
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Usuario não encontrado para atualização.');
      }
      throw new BadRequestException('Erro ao atualizar o usuario.');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(id);
      return { message: 'Usuario excluído com sucesso' };
    } catch (error) {
      throw new NotFoundException('Erro ao excluir o usuario.');
    }
  }

}
