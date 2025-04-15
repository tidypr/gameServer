import {
  Body, Controller, Get, Post, Patch, Param, Query, Delete, NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/seriallize.interceptor';
import { ReadUserDto } from './dto/read-user.dto';

@Serialize(ReadUserDto) // serialize 데코레이터를 사용하여 응답을 변환
@Controller('user')
export class UsersController {
  private readonly usersService: UsersService

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  // Auth Controller에서 사용하기 위해 주석 처리
  // @Post('/signup')
  // createUser(@Body() body: CreateUserDto) {
  //   const { username, password } = body;
  //   this.usersService.createUser(username, password);
  //   return 'User created!';
  // }

  // @UseInterceptors(ClassSerializerInterceptor) // class-transformer에서 제외된 속성은 응답에 포함되지 않음
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
    return this.usersService.updateUser(+id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }

  // @Get('/search')
}
