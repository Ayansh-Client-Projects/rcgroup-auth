import { StaffDto } from '../dto/staff.dto';
import { UserInterface } from '../user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { StaffEntity } from '../entity/staff.entity';
import { FindConditions } from 'typeorm';
import { CreateStaffDto } from '../dto/user-create.dto';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';

const mockStaffDto: StaffDto = {
  id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
  fullName: 'Aman Lodha',
  email: 'info@embraystechnologies.com',
  phoneNumber: '919986273519',
  userType: UserTypeEnum.STAFF,
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
export class StaffService implements UserInterface<StaffEntity, StaffDto> {
  createUser(createUser: CreateStaffDto): Promise<StaffEntity> {
    throw new Error('Method not implemented.');
  }
  getUserByAuthId(authId: string): Promise<StaffDto> {
    return Promise.resolve(mockStaffDto);
  }

  getUserById(id: string): Promise<StaffDto> {
    if (mockStaffDto.id === id) {
      return Promise.resolve(mockStaffDto);
    }
    throw new NotFoundException();
  }

  updateUser(staffDto: StaffDto): Promise<StaffDto> {
    if (staffDto.id !== mockStaffDto.id) {
      throw new NotFoundException();
    }

    // TODO also check if this is the logged in user itself

    mockStaffDto.aadhaarNumber = staffDto.aadhaarNumber;
    mockStaffDto.address = staffDto.address;
    mockStaffDto.bankDetails = staffDto.bankDetails;
    mockStaffDto.email = staffDto.email;
    mockStaffDto.fullName = staffDto.fullName;
    mockStaffDto.panNumber = staffDto.panNumber;
    mockStaffDto.updatedAt = new Date();

    return Promise.resolve(mockStaffDto);
  }

  getUser(condition: FindConditions<StaffEntity>): Promise<StaffEntity> {
    throw new Error('Method not implemented.');
  }
}
