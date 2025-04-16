import { Body, Controller, Get, Post, Param, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { Serialize } from 'src/interceptors/seriallize.interceptor';

@Serialize(ReadUserDto) // serialize 데코레이터를 사용하여 응답을 변환
@Controller('auth')
export class AuthController {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post ('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    console.log(session)
    return { message: '로그아웃 되었습니다.' };
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.username, body.password);
    console.log(user)
    session.userId = user.id; // 세션에 사용자 ID 저장
    console.log(session)
    return user; // 생성된 사용자 반환
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.username, body.password);
    console.log(user)
    session.userId = user.id; // 세션에 사용자 ID 저장
    console.log(session)
    return user; // 생성된 사용자 반환
  }
}
