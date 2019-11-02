export interface Trip {
  rental_id: string;
  local_start_time: string;
  local_end_time: string;
  bike_id: string;
  duration: string;
  start_station_id: string;
  start_station_name: string;
  end_station_id: string;
  end_station_name: string;
  user_type: string;
  member_gender: string;
  member_birthday_year: string;
}

export interface IAgeGroups {
  '0-20': number;
  '21-30': number;
  '31-40': number;
  '41-50': number;
  '51+': number;
}
