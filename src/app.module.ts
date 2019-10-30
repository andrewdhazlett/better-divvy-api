import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationsController } from './stations/stations.controller';

@Module({
  imports: [],
  controllers: [AppController, StationsController],
  providers: [AppService],
})
export class AppModule {}
