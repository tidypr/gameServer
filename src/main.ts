import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // ValidationPipe를 사용하여 DTO 검증을 수행
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // DTO에 정의되지 않은 속성 제거
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
