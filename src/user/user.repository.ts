import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private searchById(id: string) {
    const possibleUser = this.users.find((savedUser) => savedUser.id === id);

    if (!possibleUser) {
      throw new Error('User does not exist');
    }

    return possibleUser;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async isUserExistsByEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);

    return possibleUser !== undefined;
  }

  async update(id: string, updateData: Partial<UserEntity>) {
    const user = this.searchById(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }
      user[key] = value;
    });

    return user;
  }

  async remove(id: string) {
    const user = this.searchById(id);

    this.users = this.users.filter((savedUser) => savedUser.id !== id);

    return user;
  }
}
