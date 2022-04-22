import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
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
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  phoneNumber: string;

  @IsEnum(UserTypeEnum)
  userType: UserTypeEnum;

  @ValidateNested()
  @IsDefined()
  @Type(() => AddressDto)
  address: AddressDto;
}
