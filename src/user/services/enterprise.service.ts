import { UserTypeEnum } from './../../auth/enum/user-type.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminEnterpriseDto, StaffEnterpriseDto } from '../dto/enterprise.dto';
import { CompanyTypeEnum } from '../enum/company-type.enum';

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
  isDefault: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockStaffEnterpriseDto: StaffEnterpriseDto = {
  id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
  companyName: 'Aman Moulders',
  companyType: CompanyTypeEnum.PROPRIETORSHIP,
  isDefault: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

@Injectable()
export class EnterpriseService {
  getEnterprise(id: string, userType: UserTypeEnum) {
    if (userType === UserTypeEnum.ADMIN) {
      return this.getAdminEnterprise(id);
    }
    if (userType === UserTypeEnum.STAFF) {
      return this.getStaffEnterprise(id);
    }
    throw new Error();
  }

  private getAdminEnterprise(id: string): AdminEnterpriseDto {
    if (id === mockAdminEnterpriseDto.id) {
      return mockAdminEnterpriseDto;
    }
    throw new NotFoundException('No enterprise available with this id');
  }

  private getStaffEnterprise(id: string): StaffEnterpriseDto {
    if (id === mockStaffEnterpriseDto.id) {
      return mockStaffEnterpriseDto;
    }
    throw new NotFoundException('No enterprise available with this id');
  }

  getAllEnterprises(): Array<StaffEnterpriseDto> {
    return [mockStaffEnterpriseDto, mockStaffEnterpriseDto];
  }
}
