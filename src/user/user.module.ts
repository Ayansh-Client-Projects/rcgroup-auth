import { BankDetailsRepository } from './repository/bank-details.repository';
import { SalesmanRepository } from './salesman/repository/salesman.repository';
import { CustomerRepository } from './customer/repository/customer.repository';
import { AddressRepository } from './repository/address.repository';
import { FirebaseService } from './../auth/services/firebase.service';
import { AuthService } from './../auth/services/auth.service';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { SalesmanService } from './salesman/salesman.service';
import { StaffService } from './staff/staff.service';
import { AdminService } from './admin/admin.service';
import { EnterpriseService } from './services/enterprise.service';
import { UserHelperService } from './services/user-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin/repository/admin.repository';
import { StaffRepository } from './staff/repository/staff.repository';

@Module({
  providers: [
    AuthService,
    FirebaseService,
    CustomerService,
    UserService,
    SalesmanService,
    StaffService,
    AdminService,
    EnterpriseService,
    UserHelperService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      AdminRepository,
      CustomerRepository,
      SalesmanRepository,
      StaffRepository,
      BankDetailsRepository,
      AddressRepository,
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
