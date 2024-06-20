import { NotFoundException } from '@nestjs/common';

export class CharacterNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Personagem com o ID '${id}' não encontrado.`);
  }
}
