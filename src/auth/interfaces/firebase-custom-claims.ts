import { Constants } from '../../app.constants';
import { UserTypeEnum } from '../enum/user-type.enum';
export interface FirebaseCustomClaims {
  [Constants.USER_TYPE_KEY]: UserTypeEnum;
}
