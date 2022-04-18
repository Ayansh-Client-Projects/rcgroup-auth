import { AddressBuilder } from './address.builder';
import { AdminDto } from './../dto/admin.dto';
import { AdminEntity } from './../entity/admin.entity';
import { Builder } from './../../builder/builder.interface';
import { Injectable } from '@nestjs/common';
import { getUserEmail } from '../utils/user.util';

@Injectable()
export class AdminBuilder implements Builder<AdminEntity, AdminDto> {
  constructor(private readonly addressBuilder: AddressBuilder) {}

  toEntity(dto: AdminDto): AdminEntity {
    const adminEntity = new AdminEntity();
    adminEntity.id = dto.id;
    adminEntity.fullName = dto.fullName;
    adminEntity.address = this.addressBuilder.toEntity(dto.address);
    return adminEntity;
  }
  toDto(entity: AdminEntity): AdminDto {
    const adminDto = new AdminDto();
    adminDto.id = entity.id;
    adminDto.fullName = entity.fullName;
    adminDto.email = getUserEmail() ?? '';
    adminDto.address = this.addressBuilder.toDto(entity.address);
    adminDto.createdAt = entity.createdAt;
    adminDto.updatedAt = entity.updatedAt;
    return adminDto;
  }
}
