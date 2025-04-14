import { Body, Controller, Get, Post, Patch, Param, Query, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { username, password } = body;
    this.usersService.createUser(username, password);
    return 'User created!';
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.usersService.findUser(+id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Get()
  findUsers() {
    return this.usersService.findUsers();
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    // const { username, password } = body;
    this.usersService.updateUser(+id, body);
    return 'User updated!';
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }

  // @Get('/search')
}
