import { Schema } from 'mongoose';

export const CharactersSchema = new Schema({
   
  Name: { type: String, required: true },
  Level: { type: Number, required: true },
  Class: { type: String, required: true },
  Ability_Score: { type: String, required: true },
  Feat: { type: String, required: true },
  Alignment: { type: String, required: true },
  Spell: { type: String, required: true },
  Item: { type: String, required: true },
});