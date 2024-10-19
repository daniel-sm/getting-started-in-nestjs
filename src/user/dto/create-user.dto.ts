import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validation/unique-email.validator';

export class CreateUserDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @IsUniqueEmail({ message: 'Já existe usuário com este email' })
  email: string;

  @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  password: string;
}
