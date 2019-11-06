import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './stations.entity';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { DivvyModule } from '../divvy/divvy.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, DivvyModule, TypeOrmModule.forFeature([Station])],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [TypeOrmModule, StationsService],
})
export class StationsModule {}
