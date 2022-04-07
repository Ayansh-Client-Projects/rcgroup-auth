import { getAslValue } from './../utils/async-local-storage';
import { Constants } from '../app.constants';
import { UserTypeEnum } from '../auth/enum/user-type.enum';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(executionContext: ExecutionContext): boolean {
    const allowedUserTypes = this.reflector.get<UserTypeEnum[]>(
      Constants.USER_TYPE_PLURAL_KEY,
      executionContext.getHandler(),
    );
    console.log({ allowedUserTypes });
    if (!allowedUserTypes) {
      return true;
    }
    const user = getAslValue(Constants.USER_KEY);
    console.log({ user });
    return (
      user &&
      UserTypeEnum[user[Constants.USER_TYPE_KEY]] &&
      allowedUserTypes.includes(user[Constants.USER_TYPE_KEY])
    );
  }
}
