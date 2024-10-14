import { Body, Controller, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Controller('/users')
export class UserController {

  private userRepository = new UserRepository()
  
  @Post()
  async createUsers(@Body() userData) {

    this.userRepository.save(userData)
    
    return {
      data: userData,
      status: 'user created successfully!'
    }
  }

}
