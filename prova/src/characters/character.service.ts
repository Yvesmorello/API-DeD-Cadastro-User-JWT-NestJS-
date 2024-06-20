import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './interface/character.interface';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { DedValidationService } from './validation/ded-validation.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel('Character') private readonly characterModel: Model<Character>,
    private readonly dedValidationService: DedValidationService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    await this.dedValidationService.validateCharacter(createCharacterDto);

    const createdCharacter = new this.characterModel(createCharacterDto);
    return await createdCharacter.save();
  }

  async findOne(name: string): Promise<Character | undefined> {
    return await this.characterModel.findOne({ name }).exec();
  }

  async findByName(name: string): Promise<Character | undefined> {
    const character = await this.characterModel.findOne({ name }).exec();
    if (!character) {
      throw new NotFoundException(`Character with username ${name} not found`);
    }
    return character;
  }

  async findAll(): Promise<Character[]> {
    return await this.characterModel.find().exec();
  }

  async findById(id: string): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();
    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
    return character;
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    await this.dedValidationService.validateCharacter(updateCharacterDto);

    const updatedCharacter = await this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true }).exec();
    if (!updatedCharacter) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
    return updatedCharacter;
  }

  async remove(id: string): Promise<void> {
    const result = await this.characterModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
  }
}
