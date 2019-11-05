import { Controller, Get, Param, Inject, Query } from '@nestjs/common';
import { Station } from './stations.interface';
import { GbfsFeedService } from '../divvy/gbfs-feed/gbfs-feed.service';
import { StationsService } from './stations.service';
import { TripsService } from '../trips/trips.service';
import { Trip } from '../trips/trips.entity';

@Controller('stations')
export class StationsController {
  constructor(
    private readonly stationsService: StationsService,
    private readonly tripsService: TripsService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Station> {
    return await this.stationsService.findById(id);
  }

  @Get('/tripCounts/:date')
  async getStationTripCounts(
    @Param('date') date: string,
    @Query('station_ids') station_ids: string[],
  ): Promise<{ [k: string]: number }> {
    const trips = await this.tripsService.getTripsForDate(date, station_ids);

    return trips.reduce(
      (tripCounts: { [k: string]: number }, trip: Trip) => ({
        ...tripCounts,
        [trip.end_station_id]:
          trip.end_station_id in tripCounts
            ? tripCounts[trip.end_station_id] + 1
            : 1,
      }),
      {},
    );
  }
}
