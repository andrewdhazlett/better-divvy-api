import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './stations.entity';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { DivvyModule } from '../divvy/divvy.module';
import { DatabaseModule } from '../database/database.module';
import { TripsModule } from '../trips/trips.module';
import { TripsService } from '../trips/trips.service';
import { Trip } from '../trips/trips.entity';
import { TripDataService } from '../divvy/trip-data/trip-data.service';

@Module({
  imports: [
    DatabaseModule,
    DivvyModule,
    TripsModule,
    TypeOrmModule.forFeature([Station, Trip]),
  ],
  controllers: [StationsController],
  providers: [StationsService, TripDataService, TripsService],
  exports: [TypeOrmModule, StationsService],
})
export class StationsModule {}
