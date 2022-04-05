import { Injectable } from '@nestjs/common';
import { AddressDto } from '../dto/address.dto';
import { AddressEntity } from '../entity/address.entity';
import { Builder } from './../../builder/builder.interface';

@Injectable()
export class AddressBuilder implements Builder<AddressEntity, AddressDto> {
  toEntity(dto: AddressDto): AddressEntity {
    const addressEntity = new AddressEntity();
    addressEntity.id = dto.id;
    addressEntity.line1 = dto.line1;
    addressEntity.line2 = dto.line2;
    addressEntity.landmark = dto.landmark;
    addressEntity.city = dto.city;
    addressEntity.state = dto.state;
    addressEntity.pincode = dto.pincode;
    addressEntity.country = dto.country;
    addressEntity.createdAt = dto.createdAt;
    addressEntity.updatedAt = dto.updatedAt;
    return addressEntity;
  }
  toDto(entity: AddressEntity): AddressDto {
    const addressDto = new AddressDto();
    addressDto.id = entity.id;
    addressDto.line1 = entity.line1;
    addressDto.line2 = entity.line2;
    addressDto.landmark = entity.landmark;
    addressDto.city = entity.city;
    addressDto.state = entity.state;
    addressDto.pincode = entity.pincode;
    addressDto.country = entity.country;
    addressDto.createdAt = entity.createdAt;
    addressDto.updatedAt = entity.updatedAt;
    return addressDto;
  }
}
