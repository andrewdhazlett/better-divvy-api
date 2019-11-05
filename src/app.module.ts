import * as dotenv from 'dotenv';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DivvyModule } from './divvy/divvy.module';
import { StationsModule } from './stations/stations.module';
import { DatabaseModule } from './database/database.module';
import { TripsModule } from './trips/trips.module';
import { ApiTokenMiddleware } from './middleware/api-token.middleware';
import { StationsController } from './stations/stations.controller';
import { TripsController } from './trips/trips.controller';

dotenv.config();

@Module({
  imports: [DivvyModule, DatabaseModule, StationsModule, TripsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenMiddleware)
      .forRoutes(StationsController, TripsController);
  }
}
