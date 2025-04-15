import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

// DTO를 생성하는 클래스의 타입을 지정
interface ClassConstructor {
  new (...args: any[]): {};
}

// 데코레이터
export function Serialize(dto: ClassConstructor) {
   // Coustom Interceptor에 DTO를 사용하여 변환
  return UseInterceptors(new SerializeInterceptor(dto));
}

// Coustom Interceptor
export class SerializeInterceptor implements NestInterceptor {
  private readonly dto: any;

  constructor(dto: any) {
    this.dto = dto;
  }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // 요청이 들어오면 실행됨
    return handler.handle().pipe(
      map((data: any) => {
        // 응답이 나가기 전에 실행됨
        // data를 dto로 변환해서 반환
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // expose가 붙은 속성만 포함
        });
      }),
    );
  }
}