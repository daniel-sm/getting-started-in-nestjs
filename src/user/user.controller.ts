import { v4 as uuidv4 } from 'uuid';

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { ListUsersDTO } from './dto/list-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

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

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData);

    return {
      message: 'user updated successfully',
      user: updatedUser,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const removedUser = await this.userRepository.remove(id)

    return {
      message: "user removed successfully",
      user: removedUser,
    }
  }
}
