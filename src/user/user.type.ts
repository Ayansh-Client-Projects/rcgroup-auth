import { AdminEntity } from './entity/admin.entity';
import { StaffEntity } from './entity/staff.entity';
import { SalesmanEntity } from './entity/salesman.entity';
import { CustomerEntity } from './entity/customer.entity';
import { AdminDto } from './dto/admin.dto';
import { StaffDto } from './dto/staff.dto';
import { SalesmanDto } from './dto/salesman.dto';
import { CustomerDto } from './dto/customer.dto';

export type UserDto = CustomerDto | SalesmanDto | StaffDto | AdminDto;
export type UserEntity =
  | CustomerEntity
  | SalesmanEntity
  | StaffEntity
  | AdminEntity;
