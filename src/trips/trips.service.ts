import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './trips.entity';
import { Trip as ITrip } from './trips.interface';
import { Repository } from 'typeorm';
import { TripDataService } from '../divvy/trip-data/trip-data.service';

@Injectable()
export class TripsService {
  private readonly tripDataPromise;

  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    private readonly tripDataService: TripDataService,
  ) {
    this.tripDataPromise = this.tripsRepository.count().then(count => {
      if (count === 0) {
        return this.loadData();
      }
    });
  }

  private async loadData() {
    const data: ITrip[] = await this.tripDataService.fetchData();
    const trips = data.map((trip: ITrip) => ({
      ...trip,
      member_birthday_year: /\d+/.test(trip.member_birthday_year)
        ? parseInt(trip.member_birthday_year)
        : null,
    }));
    const entities = this.tripsRepository.create(trips);
    return this.tripsRepository.save(entities, { chunk: 500 });
  }

  async findById(rental_id: string): Promise<Trip> {
    await this.tripDataPromise;
    const record: Trip = await this.tripsRepository.findOne({
      rental_id,
    });
    if (record == null) {
      throw new Error(`Trip ${rental_id} not found`);
    }
    return record;
  }

  async getTripsForDate(date: string, station_ids?: string[]): Promise<Trip[]> {
    if (station_ids == null) {
      return this.tripsRepository.query(`
        SELECT * FROM trip
          WHERE local_start_time LIKE '%${date}%'
      `);
    }
    return this.tripsRepository.query(`
      SELECT * FROM trip
        WHERE local_start_time LIKE '%${date}%'
        AND end_station_id IN (${station_ids})
    `);
  }
}
