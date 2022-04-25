import { SalesmanDto } from '../dto/salesman.dto';
import { UserInterface } from '../user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesmanEntity } from '../entity/salesman.entity';
import { FindConditions } from 'typeorm';
import { CreateSalesmanDto } from '../dto/user-create.dto';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';

const mockSalesmanDto: SalesmanDto = {
  id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
  fullName: 'Aman Lodha',
  email: 'info@embraystechnologies.com',
  panNumber: 'AAAAA0000A',
  phoneNumber: '919986273519',
  userType: UserTypeEnum.STAFF,
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
export class SalesmanService
  implements UserInterface<SalesmanEntity, SalesmanDto>
{
  createUser(createUser: CreateSalesmanDto): Promise<SalesmanEntity> {
    throw new Error('Method not implemented.');
  }
  getUserByAuthId(authId: string): Promise<SalesmanDto> {
    return Promise.resolve(mockSalesmanDto);
  }

  getUserById(id: string): Promise<SalesmanDto> {
    if (mockSalesmanDto.id === id) {
      return Promise.resolve(mockSalesmanDto);
    }
    throw new NotFoundException();
  }

  updateUser(salesmanDto: SalesmanDto): Promise<SalesmanDto> {
    if (mockSalesmanDto.id !== salesmanDto.id) {
      throw new NotFoundException();
    }

    mockSalesmanDto.aadhaarNumber = salesmanDto.aadhaarNumber;
    mockSalesmanDto.address = salesmanDto.address;
    mockSalesmanDto.bankDetails = salesmanDto.bankDetails;
    mockSalesmanDto.email = salesmanDto.email;
    mockSalesmanDto.fullName = salesmanDto.fullName;
    mockSalesmanDto.panNumber = salesmanDto.panNumber;
    mockSalesmanDto.updatedAt = new Date();

    return Promise.resolve(mockSalesmanDto);
  }

  getUser(condition: FindConditions<SalesmanEntity>): Promise<SalesmanEntity> {
    throw new Error('Method not implemented.');
  }
}
