import UserLocationStreet from './user_location_coordinates';
import UserLocationCoordinates from './user_location_coordinates';
import UserLocationTimezone from './user_location_timezone';

export default interface UserLocation {
  street: UserLocationStreet;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: UserLocationCoordinates;
  timezone: UserLocationTimezone;
}
