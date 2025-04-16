// Custom decorator: 현재 사용자 정보 가져오기
import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.session.userId)
    return request.session.userId;
  }
);
