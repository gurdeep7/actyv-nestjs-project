import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
//get all users
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
// Get one user
  async findOne(id: string): Promise<object> {
    try {
      const id_new: number = +id;
      console.log(id_new);
      const user = await this.usersRepository.findOne({ id: id_new })
      return user;
    } catch (e) {
      return { msg: e.message };
    }
  }
// Delete one user
  async remove(id: string): Promise<object> {
    try {
      const id_new: number = +id;
      console.log(id_new);
      const user = await this.usersRepository.delete({ id: id_new });
      return user;
    } catch (e) {
      return { msg: e.message };
    }
  }
  // Insert one user to table
  async insertUser(
    firstName: string,
    lastName: string,
    isActive: boolean,
  ): Promise<unknown> {
    const user = {
      firstName,
      lastName,
      isActive,
    };
    try {
      const User = await this.usersRepository.insert(user);
      return User.generatedMaps[0].id;
    } catch (e: any) {
      return { msg: e.message };
    }
  }
  //Update a user
  async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
  ): Promise<unknown> {
    try {
      const id_new: number = +id;
      const updatedUser = await this.usersRepository.update({ id: id_new},{firstName,lastName,isActive});
      return updatedUser
    } catch (e : any) {
      return {err: e.message}
    }
  }
}
