import { AdminDto } from './dto/admin.dto';
import { StaffDto } from './dto/staff.dto';
import { SalesmanDto } from './dto/salesman.dto';
import { CustomerDto } from './dto/customer.dto';

export type User = CustomerDto | SalesmanDto | StaffDto | AdminDto;
