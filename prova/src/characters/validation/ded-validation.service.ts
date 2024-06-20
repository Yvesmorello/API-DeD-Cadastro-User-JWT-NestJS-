import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { CreateCharacterDto } from '../dto/create-character.dto'; 

@Injectable()
export class DedValidationService {
  private readonly API_BASE_URL = 'https://www.dnd5eapi.co/api';

  async validateCharacter(createCharacterDto: CreateCharacterDto): Promise<void> {
    const errors = [];

    const level = createCharacterDto.Level; 

    const abilityScoreError = await this.validateAbilityScore(createCharacterDto.Ability_Score);
    if (abilityScoreError) errors.push(abilityScoreError);

    const classError = await this.validateClass(createCharacterDto.Class);
    if (classError) errors.push(classError);

    const featError = await this.validateFeat(createCharacterDto.Feat);
    if (featError) errors.push(featError);

    const alignmentError = await this.validateAlignment(createCharacterDto.Alignment);
    if (alignmentError) errors.push(alignmentError);

    const spellError = await this.validateSpell(createCharacterDto.Spell, level);
    if (spellError) errors.push(spellError);

    const itemError = await this.validateItem(createCharacterDto.Item);
    if (itemError) errors.push(itemError);

    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; '));
    }
  }

  private async validateAbilityScore(abilityScore: string): Promise<string | null> {
    return await this.validateResource('ability-scores', abilityScore);
  }

  private async validateClass(className: string): Promise<string | null> {
    return await this.validateResource('classes', className);
  }

  private async validateFeat(featName: string): Promise<string | null> {
    return await this.validateResource('feats', featName);
  }

  private async validateAlignment(alignmentName: string): Promise<string | null> {
    return await this.validateResource('alignments', alignmentName);
  }

  private async validateSpell(spellName: string, level: number): Promise<string | null> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/spells/${spellName}`);
      const spellDetails = response.data;
      
      if (spellDetails.level > level) {
        return `Character of level ${level} cannot use spell "${spellName}" which requires level ${spellDetails.level}.`;
      }

      return null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return `Spell "${spellName}" not found in the API.`;
      } else {
        return `Error validating spell "${spellName}": ${error.message}`;
      }
    }
  }

  private async validateItem(itemName: string): Promise<string | null> {
    return await this.validateResource('equipment', itemName);
  }

  private async validateResource(resource: string, value: string): Promise<string | null> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/${resource}`);
      const validResources = response.data.results.map((item) => item.index);
      if (!validResources.includes(value)) {
        return `Invalid ${resource.slice(0, -1)}: ${value}. Valid values are: ${validResources.join(', ')}`;
      }
      return null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return `Resource ${resource} not found in the API.`;
      } else {
        return `Error validating ${resource.slice(0, -1)}: ${value}. ${error.message}`;
      }
    }
  }
}
