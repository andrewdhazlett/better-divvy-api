import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';
import { TripsModule } from './trips.module';
import { TripDataService } from '../divvy/trip-data/trip-data.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TripsModule],
      providers: [TripDataService],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should load data', async () => {
    const rental_id = '22178536';
    const trip = await service.findById(rental_id);
    expect(trip).toBeDefined();
    expect(trip).toHaveProperty('rental_id', rental_id);
  }, 999999);
});
