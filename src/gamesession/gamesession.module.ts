import { Module } from '@nestjs/common';
import { GamesessionController } from './gamesession.controller';
import { GamesessionService } from './gamesession.service';

@Module({
  controllers: [GamesessionController],
  providers: [GamesessionService]
})
export class GamesessionModule {}
