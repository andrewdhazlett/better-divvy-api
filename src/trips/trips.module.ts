import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DivvyModule } from '../divvy/divvy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trips.entity';
import { TripsService } from './trips.service';

@Module({
  imports: [DatabaseModule, DivvyModule, TypeOrmModule.forFeature([Trip])],
  exports: [TypeOrmModule],
  providers: [TripsService],
})
export class TripsModule {}