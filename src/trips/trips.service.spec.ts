import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';
import { TripsModule } from './trips.module';
import { TripDataService } from '../divvy/trip-data/trip-data.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TripsModule],
      providers: [TripDataService],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should find trips for a date', async () => {
    const date = '2019-04-22';
    const trips = await service.getTripsForDate(date);
    expect(trips).toBeDefined();
    expect(trips.length).toBeCloseTo(14500, -3);
  });

  it('should find trips for a date with station_ids', async () => {
    const date = '2019-04-22';
    const station_ids = ['15'];
    const trips = await service.getTripsForDate(date, station_ids);
    expect(trips).toBeDefined();
    expect(trips.length).toBeCloseTo(20, -1);
  });
});
