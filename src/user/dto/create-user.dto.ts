import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  password: string;
}