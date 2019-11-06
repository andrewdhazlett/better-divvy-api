import * as parse from 'csv-parse';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Trip } from '../../trips/trips.interface';

@Injectable()
export class TripDataService {
  private readonly csvPath = 'data/Divvy_Trips_2019_Q2.csv';
  private readonly csvColumns = [
    'rental_id',
    'local_start_time',
    'local_end_time',
    'bike_id',
    'duration',
    'start_station_id',
    'start_station_name',
    'end_station_id',
    'end_station_name',
    'user_type',
    'member_gender',
    'member_birthday_year',
  ];

  // low-hanging fruit: use streaming API to pipe directly from the filesystem
  //  to the csv parser instead of buffering in memory.
  //  Not implementing since this method is only used if sqlite isn't populated
  fetchData(): Promise<Trip[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.csvPath, (err, csvData) => {
        if (err != null) {
          return reject(err);
        }
        parse(
          csvData,
          { columns: this.csvColumns },
          (err, [_, ...tripData]) => {
            if (err != null) {
              return reject(err);
            }
            resolve(tripData);
          },
        );
      });
    });
  }
}
