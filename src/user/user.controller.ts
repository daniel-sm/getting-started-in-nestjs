import { v4 as uuidv4 } from 'uuid';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUsers(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = uuidv4();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    this.userRepository.save(userEntity);

    return {
      message: 'user created successfully!',
      id: userEntity.id,
    };
  }

  @Get()
  async listUsers() {
    return this.userRepository.list();
  }
}
