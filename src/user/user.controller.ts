import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller('/users')
export class UserController {

  constructor(private userRepository: UserRepository) {}
  
  @Post()
  async createUsers(@Body() userData: CreateUserDTO) {
    this.userRepository.save(userData)
    
    return {
      data: userData,
      status: 'user created successfully!'
    }
  }

  @Get()
  async listUsers() {
    return this.userRepository.list()
  }

}
