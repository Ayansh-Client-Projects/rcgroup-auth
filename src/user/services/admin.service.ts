import { AddressBuilder } from './../builder/address.builder';
import { AdminEntity } from './../entity/admin.entity';
import { AdminBuilder } from './../builder/admin.builder';
import { AdminRepository } from './../repository/admin.repository';
import { UserInterface } from '../user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminDto } from '../dto/admin.dto';
import { FindConditions } from 'typeorm';

// const mockAdminDto: AdminDto = {
//   id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
//   fullName: 'Aman Lodha',
//   email: 'aman@embraystechnologies.com',
//   address: {
//     id: 'bba6ad5b-0477-402c-8a35-54f57d2d7ed4',
//     line1: '6041, Tower 6, Prestige Bagamane Temple Bells',
//     line2: 'RR Nagar',
//     city: 'Bangalore',
//     state: 'Karnataka',
//     country: 'India',
//     pincode: 560023,
//     landmark: 'Near garuda mall',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };
@Injectable()
export class AdminService implements UserInterface<AdminEntity, AdminDto> {
  constructor(
    private readonly adminRepositor: AdminRepository,
    private readonly addressBuilder: AddressBuilder,
    private readonly adminBuilder: AdminBuilder,
  ) {}

  async getUserByAuthId(authId: string): Promise<AdminDto> {
    const adminEntity = await this.getUser({ authId });
    return this.adminBuilder.toDto(adminEntity);
  }

  async getUserById(id: string): Promise<AdminDto> {
    const adminEntity = await this.getUser({ id });
    return this.adminBuilder.toDto(adminEntity);
  }

  async updateUser(adminDto: AdminDto): Promise<AdminDto> {
    const adminEntity = await this.getUser({
      id: adminDto.id,
      addressId: adminDto.address.id,
    });

    adminEntity.fullName = adminDto.fullName;
    adminEntity.address = this.addressBuilder.toEntity(adminDto.address);

    const updatedAdminEntity = await this.adminRepositor.save(adminEntity);

    return this.adminBuilder.toDto(updatedAdminEntity);
  }

  async getUser(condition: FindConditions<AdminEntity>): Promise<AdminEntity> {
    const adminEntity = await this.adminRepositor.findOne(condition);
    if (adminEntity === undefined) {
      throw new NotFoundException('Admin does not exist');
    }
    return adminEntity;
  }
}
