import { Constants } from '../app.constants';
import { SetMetadata } from '@nestjs/common';
import { UserTypeEnum } from '../auth/enum/user-type.enum';

export const UserTypes = (...userTypes: UserTypeEnum[]) =>
  SetMetadata(Constants.USER_TYPE_PLURAL_KEY, userTypes);
