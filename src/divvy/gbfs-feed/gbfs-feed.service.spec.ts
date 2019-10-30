import { Test, TestingModule } from '@nestjs/testing';
import { GbfsFeedService } from './gbfs-feed.service';

describe('GbfsFeedService', () => {
  let service: GbfsFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GbfsFeedService],
    }).compile();

    service = module.get<GbfsFeedService>(GbfsFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
