import { Constants } from '../app.constants';
import { UserTypeEnum } from '../auth/enum/user-type.enum';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedUserTypes = this.reflector.get<UserTypeEnum[]>(
      [Constants.USER_TYPE_PLURAL_LABEL],
      context.getHandler(),
    );
    if (!allowedUserTypes) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const user = request[Constants.USER_KEY];
    return (
      user &&
      UserTypeEnum[user[Constants.USER_TYPE_KEY]] &&
      allowedUserTypes.includes(user.role)
    );
  }
}
