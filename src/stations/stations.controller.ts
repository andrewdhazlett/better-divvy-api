import { getDistance } from 'geolib';
import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
    return await this.stationsService.findById(id).catch((err: Error) => {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }

  @Get('/tripCounts/:date')
  async getStationTripCounts(
    @Param('date') date: string,
    @Query('station_ids') station_ids: string[],
  ): Promise<{ [k: string]: number }> {
    if (station_ids == null || station_ids.length == 0) {
      throw new HttpException(
        'must include station_ids query param',
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        'must include station_ids query param',
        HttpStatus.BAD_REQUEST,
      );
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
    if (lat == null || lon == null) {
      throw new HttpException(
        'must include lat and lon query params',
        HttpStatus.BAD_REQUEST,
      );
    }
    const stations = await this.stationsService.getAll().catch((err: Error) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return stations
      .sort((a: Station, b: Station) => {
        const distanceA = getDistance({ lat: a.lat, lon: a.lon }, { lat, lon });
        const distanceB = getDistance({ lat: b.lat, lon: b.lon }, { lat, lon });
        return distanceA - distanceB;
      })
      .slice(0, 5);
  }
}
