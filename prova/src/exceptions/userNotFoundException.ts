import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Usuario com o ID '${id}' não encontrado.`);
  }
}
