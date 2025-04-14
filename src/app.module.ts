import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'dev.db.sqlite',
  entities: [User],
  // entities: ['dist/**/*.entity{.ts,.js}'],

  // 개발 환경에서만 true로 설정
  synchronize: true, 
  logging: true,
});

@Module({
  imports: [typeOrmConfig, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
