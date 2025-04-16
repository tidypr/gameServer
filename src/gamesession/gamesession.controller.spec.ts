import { Test, TestingModule } from '@nestjs/testing';
import { GamesessionController } from './gamesession.controller';

describe('GamesessionController', () => {
  let controller: GamesessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesessionController],
    }).compile();

    controller = module.get<GamesessionController>(GamesessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
