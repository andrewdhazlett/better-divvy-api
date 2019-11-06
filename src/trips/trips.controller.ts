import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { IAgeGroups } from './trips.interface';
import { Trip } from './trips.entity';

@Controller('trips')
export class TripsController {
  private readonly ageGroups = {
    '0-20': 0,
    '21-30': 0,
    '31-40': 0,
    '41-50': 0,
    '51+': 0,
    unknown: 0,
  };

  constructor(private readonly tripsService: TripsService) {}

  @Get('/:date/ageGroups')
  async getAgeGroups(
    @Param('date') date: string,
    @Query('station_ids') station_ids: string[],
  ): Promise<IAgeGroups> {
    if (station_ids == null || station_ids.length == 0) {
      throw new HttpException(
        'must include station_ids query param',
        HttpStatus.BAD_REQUEST,
      );
    }
    const trips = await this.tripsService.getTripsForDate(date, station_ids);
    return trips.reduce((ageGroups: IAgeGroups, trip: Trip) => {
      const age = new Date().getFullYear() - trip.member_birthday_year;
      if (age <= 20) {
        return { ...ageGroups, '0-20': ageGroups['0-20'] + 1 };
      } else if (age <= 30) {
        return { ...ageGroups, '21-30': ageGroups['21-30'] + 1 };
      } else if (age <= 40) {
        return { ...ageGroups, '31-40': ageGroups['31-40'] + 1 };
      } else if (age <= 50) {
        return { ...ageGroups, '41-50': ageGroups['41-50'] + 1 };
      } else if (age >= 51) {
        return { ...ageGroups, '51+': ageGroups['51+'] + 1 };
      } else {
        return { ...ageGroups, unknown: ageGroups.unknown + 1 };
      }
    }, this.ageGroups);
  }

  @Get('/:date/tripCounts')
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

  @Get('/:date/recentTrips')
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
}
