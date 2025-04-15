import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // ValidationPipe를 사용하여 DTO 검증을 수행
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // SwaggerModule을 사용하여 Swagger 문서화
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // DTO에 정의되지 않은 속성 제거
    }),
  );

  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Game Server')
    .setDescription('Game Server API description')
    .setVersion('1.0')
    .addTag('game')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // run server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
