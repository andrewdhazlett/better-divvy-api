import { Module } from '@nestjs/common';
import { DivvyModule } from './divvy/divvy.module';
import { StationsModule } from './stations/stations.module';
import { DatabaseModule } from './database/database.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [DivvyModule, DatabaseModule, StationsModule, TripsModule],
})
export class AppModule {}
