import { getDistance } from 'geolib';
import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Station } from './stations.interface';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(
    private readonly stationsService: StationsService,
  ) { }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Station> {
    return await this.stationsService.findById(id).catch((err: Error) => {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }

  @Get('/nearbyStations')
  async getNearbyStations(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ): Promise<Station[]> {
    if (lat == null || lon == null) {
      throw new HttpException(
        'must include lat and lon query params',
        HttpStatus.BAD_REQUEST,
      );
    }
    const stations = await this.stationsService.getAll().catch((err: Error) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return stations
      .sort((a: Station, b: Station) => {
        const distanceA = getDistance({ lat: a.lat, lon: a.lon }, { lat, lon });
        const distanceB = getDistance({ lat: b.lat, lon: b.lon }, { lat, lon });
        return distanceA - distanceB;
      })
      .slice(0, 5);
  }
}
