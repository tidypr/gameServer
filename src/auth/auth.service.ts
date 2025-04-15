import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async signup(username: string, password: string) {
    // username이 이미 존재하는지 확인
    const existingUser = await this.usersService.findUserByUsername(username);
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    const hashedPassword = await hashPassword(password); // 비밀번호 해싱
    console.log(hashedPassword)

    // 사용자 생성
    const user = await this.usersService.createUser(username, hashedPassword);
    return user;

  }

  async signin(username: string, password: string) {
    const isUser = await this.usersService.findUserByUsername(username);

    // username이 존재하는지 확인
    if (!isUser) {
      throw new BadRequestException('사용자가 없습니다.');
    }

    // 비밀번호 확인
    const [salt, storedHash] = isUser.password.split('.'); // salt와 hash 분리
    const hash = (await scrypt(password, salt, 32)) as Buffer; // 입력받은 비밀번호 해싱
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('비밀번호가 틀렸습니다.');
    }

    // 로그인 성공
    return isUser;
  }
}

const hashPassword = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const hash = await scrypt(password, salt, 32) as Buffer;
  return `${salt}.${hash.toString('hex')}`;
};


