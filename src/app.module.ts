import { Module } from '@nestjs/common';
import { DivvyModule } from './divvy/divvy.module';
import { StationsModule } from './stations/stations.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DivvyModule, DatabaseModule, StationsModule],
})
export class AppModule {}
