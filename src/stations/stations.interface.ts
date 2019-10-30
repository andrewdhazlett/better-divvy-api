export interface Station {
  station_id: string;
  external_id: string;
  name: string;
  short_name: string;
  lat: number;
  lon: number;
  // TODO: enumerate
  rental_methods: string[];
  capacity: number;
  electric_bike_surcharge_waiver: boolean;
  eightd_has_key_dispenser: boolean;
  has_kiosk: boolean;
}
