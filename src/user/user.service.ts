import { User } from './user.type';
import { Constants } from './../app.constants';
import { CustomerService } from './customer/customer.service';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { UserTypeEnum } from '../auth/enum/user-type.enum';
import { UserInterface } from './user.interface';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly customerService: CustomerService,
  ) {}

  getUserType(): UserTypeEnum {
    return UserTypeEnum[
      this.request[Constants.USER_KEY][Constants.USER_TYPE_PLURAL_LABEL]
    ];
  }

  getUserService(): UserInterface {
    return this.customerService;
  }

  getUser(): User {
    return this.getUserService().getUser();
  }
}
