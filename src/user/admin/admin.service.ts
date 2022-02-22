import { UserInterface } from './../user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { AdminEnterpriseDto } from './dto/admin-enterprise.dto';
import { CompanyTypeEnum } from '../enum/company-type.enum';

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

const mockAdminEnterpriseDto: AdminEnterpriseDto = {
  id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
  companyName: 'Aman Moulders',
  companyType: CompanyTypeEnum.PROPRIETORSHIP,
  gstNumber: 'KAAAAAA0000A1Z5',
  bankDetails: {
    id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
    accountHolderName: 'Aman Lodha',
    ifscCode: '465786345',
    accountNumber: 85768957498,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

@Injectable()
export class AdminService implements UserInterface {
  getUser(): AdminDto {
    return mockAdminDto;
  }

  getAdminEnterprise(id: string): AdminEnterpriseDto {
    if (id === mockAdminEnterpriseDto.id) {
      return mockAdminEnterpriseDto;
    }
    throw new NotFoundException('No enterprise available with this id');
  }
}
