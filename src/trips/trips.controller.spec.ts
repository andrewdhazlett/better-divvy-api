import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsModule } from './trips.module';
import { IAgeGroups } from './trips.interface';

describe('Trips Controller', () => {
  let controller: TripsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TripsModule],
      controllers: [TripsController],
    }).compile();

    controller = module.get<TripsController>(TripsController);
  });

  it('should get age groups for a date with station_ids', async () => {
    const date = '2019-04-22';
    const station_ids = ['15'];
    const data: IAgeGroups = await controller.getAgeGroups(date, station_ids);
    expect(data).toHaveProperty('0-20');
    expect(data).toHaveProperty('21-30');
    expect(data).toHaveProperty('31-40');
    expect(data).toHaveProperty('41-50');
    expect(data).toHaveProperty('51+');
  });

  it('should get trip counts for stations on a date', async () => {
    const date = '2019-04-22';
    const station_id = '16';
    const data = await controller.getStationTripCounts(date, [station_id]);
    expect(data).toHaveProperty(station_id);
    expect(data[station_id]).toBeGreaterThan(20);
  });

  it('should get recent trips for stations on a date', async () => {
    const date = '2019-04-22';
    const station_id = '16';
    const data = await controller.getStationRecentTrips(date, [station_id]);
    expect(data).toHaveProperty(station_id);
    expect(data[station_id].length).toEqual(20);
  });
});
