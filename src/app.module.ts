import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationsController } from './stations/stations.controller';
import { DivvyModule } from './divvy/divvy.module';

@Module({
  imports: [DivvyModule],
  controllers: [AppController, StationsController],
  providers: [AppService],
})
export class AppModule {}
