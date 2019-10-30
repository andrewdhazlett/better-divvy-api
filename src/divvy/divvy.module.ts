import { Module } from '@nestjs/common';
import { GbfsFeedService } from './gbfs-feed/gbfs-feed.service';
import { TripDataService } from './trip-data/trip-data.service';

@Module({
  providers: [GbfsFeedService, TripDataService],
})
export class DivvyModule {}
