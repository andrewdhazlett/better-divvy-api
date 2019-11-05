import { getDistance } from 'geolib';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Station } from './stations.interface';
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
    if (station_ids == null || station_ids.length == 0) {
      throw new Error('BadRequest: must include station_ids query param');
    }
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

  @Get('/recentTrips/:date')
  async getStationRecentTrips(
    @Param('date') date: string,
    @Query('station_ids') station_ids: string[],
  ): Promise<{ [k: string]: Trip[] }> {
    if (station_ids == null || station_ids.length == 0) {
      throw new Error('BadRequest: must include station_ids query param');
    }
    const trips = await this.tripsService.getTripsForDate(date, station_ids);

    return trips.reduce(
      (recentTrips: { [k: string]: Trip[] }, trip: Trip) => ({
        ...recentTrips,
        [trip.end_station_id]: [
          ...(trip.end_station_id in recentTrips
            ? recentTrips[trip.end_station_id]
            : []),
          trip,
        ].slice(-20),
      }),
      {},
    );
  }

  @Get('/nearbyStations')
  async getNearbyStations(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ): Promise<Station[]> {
    const stations = await this.stationsService.getAll();
    return stations
      .sort((a: Station, b: Station) => {
        const distanceA = getDistance({ lat: a.lat, lon: a.lon }, { lat, lon });
        const distanceB = getDistance({ lat: b.lat, lon: b.lon }, { lat, lon });
        return distanceA - distanceB;
      })
      .slice(0, 5);
  }
}
