import { Body, Controller, Post } from "@nestjs/common";

@Controller('/users')
export class UserController {
  @Post()
  async createUsers() {
    return {
      status: 'user created successfully!'
    }
  }
}
