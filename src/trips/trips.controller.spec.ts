import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TripsModule } from './trips.module';
import { TripDataService } from '../divvy/trip-data/trip-data.service';
import { IAgeGroups } from './trips.interface';

describe('Trips Controller', () => {
  let controller: TripsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TripsModule],
      controllers: [TripsController],
      providers: [TripDataService, TripsService],
    }).compile();

    controller = module.get<TripsController>(TripsController);
  });

  it('should get age groups for a date', async () => {
    const date = '2019-04-22';
    const data: IAgeGroups = await controller.getAgeGroups(date);
    expect(data).toHaveProperty('0-20');
    expect(data).toHaveProperty('21-30');
    expect(data).toHaveProperty('31-40');
    expect(data).toHaveProperty('41-50');
    expect(data).toHaveProperty('51+');
  });
});
