import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '../stations/stations.entity';
import { Trip } from '../trips/trips.entity';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'data/better-divvy.sql',
  entities: [Station, Trip],
  synchronize: true,
});
