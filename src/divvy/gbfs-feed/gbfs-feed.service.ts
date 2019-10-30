import * as request from 'request-promise';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GbfsFeedService {
  feedUrl: string =
    'https://gbfs.divvybikes.com/gbfs/en/station_information.json';

  async fetchData() {
    const response = await request(this.feedUrl, { json: true });
    if (response.data == null || response.data.stations == null) {
      throw new Error('malformed GBFS response');
    }
    return response.data.stations;
  }
}
