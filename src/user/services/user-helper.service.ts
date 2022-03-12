import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Injectable } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { StaffService } from './staff.service';
import { AdminService } from './admin.service';
import { CustomerService } from './customer.service';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';
import { Constants } from '../../app.constants';
import { UserInterface } from '../user.interface';
import { asyncLocalStorage } from '../../utils/async-local-storage';

@Injectable()
export class UserHelperService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private readonly staffService: StaffService,
    private readonly salesmanService: SalesmanService,
  ) {}

  getUserType(): UserTypeEnum {
    return UserTypeEnum[
      asyncLocalStorage.getStore()?.get(Constants.USER_KEY)[
        Constants.USER_TYPE_KEY
      ]
    ];
  }

  getUserAuthId(): string {
    const user: DecodedIdToken = asyncLocalStorage
      .getStore()
      ?.get(Constants.USER_KEY);
    return user.uid;
  }

  getUserService(): UserInterface {
    console.log({ userType: this.getUserType() });
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
