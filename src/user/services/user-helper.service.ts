import { Inject, Injectable } from '@nestjs/common';
import { SalesmanService } from '../salesman/salesman.service';
import { StaffService } from '../staff/staff.service';
import { AdminService } from '../admin/admin.service';
import { CustomerService } from '../customer/customer.service';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';
import { Constants } from '../../app.constants';
import { UserInterface } from '../user.interface';

@Injectable()
export class UserHelperService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private readonly staffService: StaffService,
    private readonly salesmanService: SalesmanService,
  ) {}

  getUserType(): UserTypeEnum {
    return UserTypeEnum[
      this.request[Constants.USER_KEY][Constants.USER_TYPE_PLURAL_LABEL]
    ];
  }

  getUserService(): UserInterface {
    switch (this.getUserType()) {
      case UserTypeEnum.ADMIN:
        return this.adminService;
      case UserTypeEnum.CUSTOMER:
        return this.customerService;
      case UserTypeEnum.SALESMAN:
        return this.salesmanService;
      case UserTypeEnum.STAFF:
        return this.staffService;
    }
  }

  isAdminOrStaffUserType(): boolean {
    return (
      this.getUserType() === UserTypeEnum.ADMIN ||
      this.getUserType() === UserTypeEnum.STAFF
    );
  }
}
