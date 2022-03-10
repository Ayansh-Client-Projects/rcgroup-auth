import { AdminDto } from './admin/dto/admin.dto';
import { StaffDto } from './staff/dto/staff.dto';
import { SalesmanDto } from './salesman/dto/salesman.dto';
import { CustomerDto } from './dto/customer.dto';

export type User = CustomerDto | SalesmanDto | StaffDto | AdminDto;
