import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Station {
  @PrimaryColumn()
  station_id: string;

  @Column()
  external_id: string;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  rental_methods: string;

  @Column('int')
  capacity: number;

  @Column()
  electric_bike_surcharge_waiver: boolean;

  @Column()
  eightd_has_key_dispenser: boolean;

  @Column()
  has_kiosk: boolean;
}
