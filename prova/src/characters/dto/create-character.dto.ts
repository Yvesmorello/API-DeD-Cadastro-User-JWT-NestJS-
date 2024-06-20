import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCharacterDto {

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  Level: number;

  @IsString()
  @IsNotEmpty()
  Ability_Score: string;

  @IsString()
  @IsNotEmpty()
  Class: string;

  @IsString()
  @IsNotEmpty()
  Feat: string;

  @IsString()
  @IsNotEmpty()
  Alignment: string;

  @IsString()
  @IsNotEmpty()
  Spell: string;

  @IsString()
  @IsNotEmpty()
  Item: string;

}
