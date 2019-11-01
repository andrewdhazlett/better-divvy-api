import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '../stations/stations.entity';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'data/better-divvy.sql',
  entities: [Station],
  synchronize: true,
});
