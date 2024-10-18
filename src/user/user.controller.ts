import { v4 as uuidv4 } from 'uuid';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { ListUsersDTO } from './dto/list-users.dto';

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
      user: new ListUsersDTO(userEntity.id, userEntity.name),
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.list();

    const usersList = savedUsers.map(
      (user) => new ListUsersDTO(user.id, user.name),
    );

    return usersList;
  }
}
