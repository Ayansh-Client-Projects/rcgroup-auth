import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SalesmanService } from './salesman/salesman.service';
import { StaffService } from './staff/staff.service';
import { AdminService } from './admin/admin.service';

@Module({
  providers: [
    CustomerService,
    UserService,
    SalesmanService,
    StaffService,
    AdminService,
  ],
  controllers: [UserController],
})
export class UserModule {}
