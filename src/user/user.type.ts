import { SalesmanDto } from './salesman/dto/salesman.dto';
import { CustomerDto } from './customer/dto/customer.dto';

export type User = CustomerDto | SalesmanDto;
