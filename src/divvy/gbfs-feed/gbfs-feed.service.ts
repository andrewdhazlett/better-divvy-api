import * as request from 'request-promise';
import { Injectable } from '@nestjs/common';
import { Station } from '../../stations/stations.interface';

@Injectable()
export class GbfsFeedService {
  feedUrl: string =
    'https://gbfs.divvybikes.com/gbfs/en/station_information.json';

  async fetchData(): Promise<Station[]> {
    const response = await request(this.feedUrl, { json: true });
    if (response.data == null || response.data.stations == null) {
      throw new Error('malformed GBFS response');
    }
    return response.data.stations;
  }
}
