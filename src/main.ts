import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // ValidationPipe를 사용하여 DTO 검증을 수행
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // SwaggerModule을 사용하여 Swagger 문서화
import { AppModule } from './app.module';
// const cookieSession = require('cookie-session');
// import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors
  // app.enableCors({
  //   origin: 'http://localhost:3000', // 클라이언트 주소
  //   credentials: true,               // 쿠키 포함 허용
  // });
  // middlewares
  // app.use(cookieSession({
  //   name: 'session',
  //   keys: [process.env.COOKIE_KEY], // 쿠키 암호화 키
  //   maxAge: 24 * 60 * 60 * 1000, // 쿠키 만료 시간 (1일)
  //   httpOnly: true, // 클라이언트에서 쿠키 접근 불가
  //   secure: false, // HTTPS 사용 시 true로 설정
  //   sameSite: 'strict', // CSRF 공격 방지
  // }))
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.COOKIE_KEY, // 쿠키 암호화 키
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // HTTPS 환경에서는 true로 설정
    }),
  );
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
