import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from '../../dto/base.dto';
import { AddressDto } from './address.dto';
export class UserDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
