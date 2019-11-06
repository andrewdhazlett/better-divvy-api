import { Test, TestingModule } from '@nestjs/testing';
import { StationsController } from './stations.controller';
import { StationsModule } from './stations.module';
import { TripsModule } from '../trips/trips.module';

const stationData = {
  station_id: expect.stringMatching(/\d+/),
  external_id: expect.any(String),
  name: expect.any(String),
  short_name: expect.any(String),
  lat: expect.any(Number),
  lon: expect.any(Number),
  rental_methods: expect.arrayContaining([expect.any(String)]),
  capacity: expect.any(Number),
  electric_bike_surcharge_waiver: expect.any(Boolean),
  eightd_has_key_dispenser: expect.any(Boolean),
  has_kiosk: expect.any(Boolean),
};

describe('Stations Controller', () => {
  let controller: StationsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TripsModule, StationsModule],
      controllers: [StationsController],
    }).compile();

    controller = module.get<StationsController>(StationsController);
  });

  it('should get data for a station by id', async () => {
    const id = '100';
    const data = await controller.findById(id);
    expect(data).toMatchObject(stationData);
    expect(data).toHaveProperty('station_id', id);
  }, 99999);

  it('should get nearby stations for a coordinate', async () => {
    const lat = 41.903543;
    const lon = -87.669308;
    const data = await controller.getNearbyStations(lat, lon);
    expect(data.length).toEqual(5);
  });
});
