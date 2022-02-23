import { SalesmanDto } from './dto/salesman.dto';
import { UserInterface } from './../user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

const mockSalesmanDto: SalesmanDto = {
  id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
  fullName: 'Aman Lodha',
  email: 'info@embraystechnologies.com',
  panNumber: 'AAAAA0000A',
  aadhaarNumber: '222222222222',
  bankDetails: {
    id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
    accountHolderName: 'Aman Lodha',
    ifscCode: '465786345',
    accountNumber: 85768957498,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
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
export class SalesmanService implements UserInterface {
  getUser(): SalesmanDto {
    return mockSalesmanDto;
  }
  getUserById(id: string): SalesmanDto {
    if (mockSalesmanDto.id === id) {
      return mockSalesmanDto;
    }
    throw new NotFoundException();
  }
  updateUser(salesmanDto: SalesmanDto): SalesmanDto {
    if (mockSalesmanDto.id !== salesmanDto.id) {
      throw new NotFoundException();
    }

    // TODO also check if this is the logged in user itself

    mockSalesmanDto.aadhaarNumber = salesmanDto.aadhaarNumber;
    mockSalesmanDto.address = salesmanDto.address;
    mockSalesmanDto.bankDetails = salesmanDto.bankDetails;
    mockSalesmanDto.email = salesmanDto.email;
    mockSalesmanDto.fullName = salesmanDto.fullName;
    mockSalesmanDto.panNumber = salesmanDto.panNumber;
    mockSalesmanDto.updatedAt = new Date();

    return mockSalesmanDto;
  }
}
