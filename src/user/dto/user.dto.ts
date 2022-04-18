import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNotEmptyObject,
  ValidateNested,
  IsDefined,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';
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

  @IsPhoneNumber('IN')
  @IsDefined()
  mobileNumber: string;

  @IsDefined()
  @IsEnum(UserTypeEnum)
  userType: UserTypeEnum;

  @IsNotEmptyObject()
  @ValidateNested()
  @IsDefined()
  @Type(() => AddressDto)
  address: AddressDto;
}
