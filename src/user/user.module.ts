import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [CustomerService, UserService],
  controllers: [UserController],
})
export class UserModule {}
