// Read에서 intercept에 사용하는 DTO, 아웃풋을 정의하는 클래스
// 유효성검사는 실행하지않음

import { Expose } from 'class-transformer';

export class ReadUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;
}
