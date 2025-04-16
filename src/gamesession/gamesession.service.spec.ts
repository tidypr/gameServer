import { Test, TestingModule } from '@nestjs/testing';
import { GamesessionService } from './gamesession.service';

describe('GamesessionService', () => {
  let service: GamesessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesessionService],
    }).compile();

    service = module.get<GamesessionService>(GamesessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
