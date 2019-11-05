import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station as IStation } from './stations.interface';
import { Station } from './stations.entity';
import { Repository } from 'typeorm';
import { GbfsFeedService } from '../divvy/gbfs-feed/gbfs-feed.service';

@Injectable()
export class StationsService {
  private readonly gbfsDataPromise;

  constructor(
    @InjectRepository(Station)
    private readonly stationsRepository: Repository<Station>,
    private readonly gbfsFeed: GbfsFeedService,
  ) {
    this.gbfsDataPromise = this.stationsRepository.count().then(count => {
      if (count === 0) {
        return this.loadData();
      }
    });
  }

  private async loadData() {
    const data: IStation[] = await this.gbfsFeed.fetchData();
    const stations = data.map((station: IStation) => ({
      ...station,
      rental_methods: station.rental_methods.join(','),
    }));
    const entities = this.stationsRepository.create(stations);
    return this.stationsRepository.save(entities);
  }

  async findById(station_id: string): Promise<IStation> {
    await this.gbfsDataPromise;
    const record: Station = await this.stationsRepository.findOne({
      station_id,
    });
    if (record == null) {
      throw new Error(`Station ${station_id} not found`);
    }
    return { ...record, rental_methods: record.rental_methods.split(',') };
  }

  async getAll(): Promise<IStation[]> {
    await this.gbfsDataPromise;
    const records: Station[] = await this.stationsRepository.find({});
    return records.map((record: Station) => ({
      ...record,
      rental_methods: record.rental_methods.split(','),
    }));
  }
}
