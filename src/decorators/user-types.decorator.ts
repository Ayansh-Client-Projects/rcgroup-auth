import { Constants } from '../app.constants';
import { SetMetadata } from '@nestjs/common';

export const UserTypes = (...userTypes: string[]) =>
  SetMetadata(Constants.USER_TYPE_PLURAL_KEY, userTypes);
