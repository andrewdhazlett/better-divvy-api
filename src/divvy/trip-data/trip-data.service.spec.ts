import { Test, TestingModule } from '@nestjs/testing';
import { TripDataService } from './trip-data.service';

describe('TripDataService', () => {
  let service: TripDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripDataService],
    }).compile();

    service = module.get<TripDataService>(TripDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
