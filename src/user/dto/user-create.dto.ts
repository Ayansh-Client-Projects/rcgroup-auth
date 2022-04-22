import { AddressDto } from './address.dto';
import { UserDto } from './user.dto';
import { UserTypeEnum } from './../../auth/enum/user-type.enum';
import { AdminDto } from './admin.dto';
import {
  IsDefined,
  IsEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { StaffDto } from './staff.dto';
import { SalesmanDto } from './salesman.dto';
import { CustomerDto } from './customer.dto';
import { Type } from 'class-transformer';
import { Constants } from '../../app.constants';
import { passwordRegex } from '../user.regex';

class CreateAddressDto extends AddressDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;
}

export class CreateAdminDto extends AdminDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @ValidateNested()
  @IsDefined()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsString()
  @Matches(passwordRegex, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateStaffDto extends StaffDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @ValidateNested()
  @IsDefined()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsString()
  @Matches(passwordRegex, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateSalesmanDto extends SalesmanDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @ValidateNested()
  @IsDefined()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsString()
  @Matches(passwordRegex, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateCustomerDto extends CustomerDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @ValidateNested()
  @IsDefined()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsString()
  @Matches(passwordRegex, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateUserDto {
  @ValidateNested()
  @IsDefined()
  @Type(() => UserDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: Constants.USER_TYPE_KEY,
      subTypes: [
        { value: CreateCustomerDto, name: UserTypeEnum.CUSTOMER },
        { value: CreateAdminDto, name: UserTypeEnum.ADMIN },
        { value: CreateSalesmanDto, name: UserTypeEnum.SALESMAN },
        { value: CreateStaffDto, name: UserTypeEnum.STAFF },
      ],
    },
  })
  user: CreateUserDtoType;
}

export type CreateUserDtoType =
  | CreateAdminDto
  | CreateCustomerDto
  | CreateSalesmanDto
  | CreateStaffDto;
