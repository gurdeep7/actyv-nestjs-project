import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { nanoid } from 'nanoid';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  //add a user in table
  @Post()
  async addUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('isActive') isActive: boolean,
  ) {
    const createdUserId = await this.userService.insertUser(
      firstName,
      lastName,
      isActive,
    );
    return { message: 'User Successfull created with id ' + createdUserId };
  }
  //Get all users
  @Get()
  async findAllUser() {
    return await this.userService.findAll();
  }
// Get a single user by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }
  //delete request
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
//update request
  @Patch(':id')
  async updateUser(@Param('id') id: string,
  @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('isActive') isActive: boolean,
  ){
    return await this.userService.updateUser(id, firstName, lastName, isActive)
  }
}
