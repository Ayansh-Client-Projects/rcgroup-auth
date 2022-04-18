import { AdminDto } from './admin.dto';
import { IsString, Length, Matches } from 'class-validator';
import { StaffDto } from './staff.dto';
import { SalesmanDto } from './salesman.dto';
import { CustomerDto } from './customer.dto';

export class CreateAdminDto extends AdminDto {
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateStaffDto extends StaffDto {
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateSalesmanDto extends SalesmanDto {
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateCustomerDto extends CustomerDto {
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export type CreateUserDto =
  | CreateAdminDto
  | CreateCustomerDto
  | CreateSalesmanDto
  | CreateStaffDto;
