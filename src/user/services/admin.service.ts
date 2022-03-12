import { UserInterface } from '../user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminDto } from '../dto/admin.dto';

const mockAdminDto: AdminDto = {
  id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
  fullName: 'Aman Lodha',
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
export class AdminService implements UserInterface {
  getUserByAuthId(authId: string): AdminDto {
    return mockAdminDto;
  }
  getUserById(id: string): AdminDto {
    if (mockAdminDto.id === id) {
      return mockAdminDto;
    }
    throw new NotFoundException();
  }
  updateUser(adminDto: AdminDto): AdminDto {
    if (adminDto.id !== mockAdminDto.id) {
      throw new NotFoundException();
    }

    mockAdminDto.address = adminDto.address;
    mockAdminDto.email = adminDto.email;
    mockAdminDto.fullName = adminDto.fullName;
    mockAdminDto.updatedAt = new Date();

    return adminDto;
  }
}
