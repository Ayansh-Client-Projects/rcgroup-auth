import { UserDto } from './../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { StaffService } from './staff.service';
import { AdminService } from './admin.service';
import { CustomerService } from './customer.service';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';
import { UserInterface } from '../user.interface';
import { UserEntity } from '../entity/user.entity';
import { getUserType } from '../utils/user.util';

@Injectable()
export class UserHelperService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private readonly staffService: StaffService,
    private readonly salesmanService: SalesmanService,
  ) {}

  getUserService(): UserInterface<UserEntity, UserDto> {
    return this.getUserServiceByUserType(getUserType());
  }

  getUserServiceByUserType(
    userType: UserTypeEnum,
  ): UserInterface<UserEntity, UserDto> {
    console.log({ userType });
    switch (userType) {
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
}
