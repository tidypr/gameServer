import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { Serialize } from 'src/interceptors/seriallize.interceptor';

@Serialize(ReadUserDto) // serialize 데코레이터를 사용하여 응답을 변환
@Controller('auth')
export class AuthController {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body.username, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.username, body.password);
  }
}
