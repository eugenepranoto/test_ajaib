import UserName from './user_name/user_name';
import UserLocation from './user_location/user_location';
import UserDob from './user_dob/user_dob';
import UserRegistered from './user_registered/user_registered';
import UserId from './user_id/user_id';
import UserPicture from './user_picture/user_picture';
import UserLogin from './user_login/user_login';

export default interface UserModel {
  gender: string;
  name: UserName;
  location: UserLocation;
  email: string;
  login: UserLogin;
  dob: UserDob;
  registered: UserRegistered;
  phone: string;
  cell: string;
  id: UserId;
  picture: UserPicture;
  nat: string;
}
