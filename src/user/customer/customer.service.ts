import { UserInterface } from './../user.interface';
import { CustomerDto } from './dto/customer.dto';
import { Injectable } from '@nestjs/common';
import { CompanyTypeEnum } from '../enum/company-type.enum';

const mockCustomerDto = {
  id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
  fullName: 'Aman Lodha',
  companyName: 'Embrays Technologies',
  companyType: CompanyTypeEnum.PRIVATE_LIMITED,
  gstNumber: 'KAAAAAA0000A1Z5',
  aadhaarNumber: '222222222222',
  email: 'aman@embraystechnologies.com',
  address: {
    id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
    line1: '6041, Tower 6, Prestige Bagamane Temple Bells',
    line2: 'RR Nagar',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    pincode: 560023,
    landmark: 'Near garuda mall',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

@Injectable()
export class CustomerService implements UserInterface {
  updateUser() {
    throw new Error('Method not implemented.');
  }
  getUser(): CustomerDto {
    return mockCustomerDto;
  }
}
