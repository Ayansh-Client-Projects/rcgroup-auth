import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNotEmptyObject,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { BaseDto } from '../../dto/base.dto';
import { AddressDto } from './address.dto';
export class UserDto extends BaseDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @IsDefined()
  @Type(() => AddressDto)
  address: AddressDto;
}
