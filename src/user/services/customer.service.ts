import { UserInterface } from '../user.interface';
import { CustomerDto } from '../dto/customer.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyTypeEnum } from '../enum/company-type.enum';

const mockCustomerDto: CustomerDto = {
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
  createdAt: new Date(),
  updatedAt: new Date(),
};

@Injectable()
export class CustomerService implements UserInterface {
  getUser(): CustomerDto {
    return mockCustomerDto;
  }
  getUserById(id: string): CustomerDto {
    if (mockCustomerDto.id === id) {
      return mockCustomerDto;
    }
    throw new NotFoundException();
  }
  updateUser(customerDto: CustomerDto): CustomerDto {
    if (mockCustomerDto.id !== customerDto.id) {
      throw new NotFoundException();
    }

    mockCustomerDto.aadhaarNumber = customerDto.aadhaarNumber;
    mockCustomerDto.address = customerDto.address;
    mockCustomerDto.companyName = customerDto.companyName;
    mockCustomerDto.companyType = customerDto.companyType;
    mockCustomerDto.email = customerDto.email;
    mockCustomerDto.fullName = customerDto.fullName;
    mockCustomerDto.gstNumber = customerDto.gstNumber;
    mockCustomerDto.updatedAt = new Date();

    return mockCustomerDto;
  }
}
