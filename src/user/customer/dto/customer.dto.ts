import { AddressDto } from './../../dto/user-address.dto';
import { aadhaarRegex } from './../../user.regex';
import { CompanyTypeEnum } from './../../enum/company-type.enum';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsEnum,
  Matches,
  IsEmail,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { gstRegex } from '../../user.regex';
import { Type } from 'class-transformer';

export class CustomerDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsEnum(CompanyTypeEnum)
  companyType: string;

  @IsNotEmpty()
  @Matches(gstRegex)
  gstNumber: string;

  @IsNotEmpty()
  @Matches(aadhaarRegex)
  aadhaarNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
