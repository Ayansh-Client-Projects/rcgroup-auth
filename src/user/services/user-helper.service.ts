import { StaffDto } from './../dto/staff.dto';
import { SalesmanDto } from './../dto/salesman.dto';
import { CustomerDto } from './../dto/customer.dto';
import { AdminDto } from './../dto/admin.dto';
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
    console.log({ userType: getUserType() });
    switch (getUserType()) {
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

  getUserDtoType(): UserDto {
    console.log({ userType: getUserType() });
    switch (getUserType()) {
      case UserTypeEnum.ADMIN:
        return new AdminDto();
      case UserTypeEnum.CUSTOMER:
        return new CustomerDto();
      case UserTypeEnum.SALESMAN:
        return new SalesmanDto();
      case UserTypeEnum.STAFF:
        return new StaffDto();
    }
  }
}
