import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCharacterDto {
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  Level: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Ability_Score: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Class: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Feat: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Alignment: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Spell: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Item: string;
}
