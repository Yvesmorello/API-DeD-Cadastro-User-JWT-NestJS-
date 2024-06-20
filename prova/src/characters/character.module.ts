import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterService } from './character.service';
import { CharactersSchema } from './schema/character.schema';
import { CharacterController } from './character.controller';
import { DedValidationService } from './validation/ded-validation.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Character', schema: CharactersSchema }])],
    providers: [CharacterService, DedValidationService],
    controllers: [CharacterController],
    exports: [CharacterService, DedValidationService],
  })
  export class CharacterModule {}
