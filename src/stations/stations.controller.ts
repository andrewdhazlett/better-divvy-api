import { Controller, Get, Param, Inject } from '@nestjs/common';
import { Station } from './stations.interface';
import { GbfsFeedService } from '../divvy/gbfs-feed/gbfs-feed.service';

@Controller('stations')
export class StationsController {
  constructor(
    @Inject(GbfsFeedService) private readonly feedService: GbfsFeedService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Station> {
    const stations = await this.feedService.fetchData();
    return stations.find((station: Station) => station.station_id === id);
  }
}
