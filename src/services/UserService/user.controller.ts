import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../UserService/dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);

    return result;
  }
}
