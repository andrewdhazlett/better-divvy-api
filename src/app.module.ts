import { Module } from '@nestjs/common';
import { StationsController } from './stations/stations.controller';
import { DivvyModule } from './divvy/divvy.module';

@Module({
  imports: [DivvyModule],
  controllers: [StationsController],
  providers: [],
})
export class AppModule {}
