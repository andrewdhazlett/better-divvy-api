import { Test, TestingModule } from '@nestjs/testing';
import { StationsController } from './stations.controller';
import { DivvyModule } from '../divvy/divvy.module';
import { GbfsFeedService } from '../divvy/gbfs-feed/gbfs-feed.service';

const stationData = {
  station_id: expect.stringMatching(/\d+/),
  external_id: expect.any(String),
  name: expect.any(String),
  short_name: expect.any(String),
  lat: expect.any(Number),
  lon: expect.any(Number),
  // TODO: enumerate
  rental_methods: expect.arrayContaining([expect.any(String)]),
  capacity: expect.any(Number),
  electric_bike_surcharge_waiver: expect.any(Boolean),
  eightd_has_key_dispenser: expect.any(Boolean),
  has_kiosk: expect.any(Boolean),
};

describe('Stations Controller', () => {
  let controller: StationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DivvyModule],
      controllers: [StationsController],
      providers: [GbfsFeedService],
    }).compile();

    controller = module.get<StationsController>(StationsController);
  });

  it('should get data for a station by id', async () => {
    const id = '100';
    const data = await controller.findById(id);
    expect(data).toMatchObject(stationData);
    expect(data).toHaveProperty('station_id', id);
  });
});
