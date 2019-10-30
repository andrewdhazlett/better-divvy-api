import { Controller, Get, Param } from '@nestjs/common';

@Controller('stations')
export class StationsController {
  @Get(':id')
  findById(@Param('id') id: Number) {
    return `a station with id ${id}`
  }
}