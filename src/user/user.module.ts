import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SalesmanService } from './salesman/salesman.service';
import { StaffService } from './staff/staff.service';

@Module({
  providers: [CustomerService, UserService, SalesmanService, StaffService],
  controllers: [UserController],
})
export class UserModule {}
