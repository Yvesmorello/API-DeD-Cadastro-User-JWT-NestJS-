import { Document } from 'mongoose';

export interface Character extends Document {
  Name: string,
  Level: number,
  Class: string,
  Ability_Score: string,
  Feat: string,
  Alignment: string,
  Spell: string,
  Item: string,
}