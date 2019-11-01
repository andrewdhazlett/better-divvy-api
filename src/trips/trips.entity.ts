import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryColumn()
  rental_id: string;

  @Column()
  local_start_time: string;

  @Column()
  local_end_time: string;

  @Column()
  bike_id: string;

  @Column()
  duration: string;

  @Column()
  start_station_id: string;

  @Column()
  start_station_name: string;

  @Column()
  end_station_id: string;

  @Column()
  end_station_name: string;

  @Column()
  user_type: string;

  @Column()
  member_gender: string;

  @Column({ nullable: true })
  member_birthday_year: number;
}
