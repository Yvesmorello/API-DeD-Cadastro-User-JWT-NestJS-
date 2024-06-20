import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Length(4, 20, { message: 'Sanha precisa ter entre 4 e 10 caracteres' })
  password: string;
}
