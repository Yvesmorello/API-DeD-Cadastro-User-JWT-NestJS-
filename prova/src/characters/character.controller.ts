import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, BadRequestException, NotFoundException, Put } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterService } from './character.service';
import { CharacterNotFoundException } from '../exceptions/characterNotFoundException';
import { Character } from './interface/character.interface';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}


  //EXCEÇÃO DA CRIAÇÃO DO PERSONAGEM ESTA SENDO FEITA PELA CLASSE ded-validation DE ACORDO COM OS DADOS DA API 
  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
      const createdCharacter = await this.characterService.create(createCharacterDto);
      return createdCharacter; 
  }

  @Get('/charactername/:name')
  async findByName(@Param('name') name: string) {
    try {
      const character = await this.characterService.findByName(name);
      if (!character) {
        throw new NotFoundException('Usuario não encontrado.');
      }
      return character;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar usuario.');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.characterService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar os personagens.');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const character = await this.characterService.findById(id);
      if (!character) {
        throw new CharacterNotFoundException(id);
      }
      return character;
    } catch (error) {
      throw new NotFoundException('Erro ao buscar personagem por id.');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    try {
      const character = await this.characterService.update(id, updateCharacterDto);
      return character;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message || 'Erro ao atualizar o personagem.');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.characterService.remove(id);
      return { message: 'Personagem excluído com sucesso' };
    } catch (error) {
      throw new NotFoundException('Erro ao excluir o personagem.');
    }
  }

}
