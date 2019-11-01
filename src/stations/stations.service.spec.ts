import { Test, TestingModule } from '@nestjs/testing';
import { StationsService } from './stations.service';
import { StationsModule } from './stations.module';
import { GbfsFeedService } from '../divvy/gbfs-feed/gbfs-feed.service';

describe('StationsService', () => {
  let service: StationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StationsModule],
      providers: [GbfsFeedService],
    }).compile();

    service = module.get<StationsService>(StationsService);
  });

  it('should get a station by station_id', async () => {
    const station_id = '7';
    const station = await service.findById(station_id);
    expect(station).toBeDefined();
    expect(station).toHaveProperty('station_id', station_id);
  });
});
