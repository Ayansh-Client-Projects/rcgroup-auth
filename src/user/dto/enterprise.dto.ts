import { BankDetailsDto } from './bank-details.dto';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CompanyTypeEnum } from '../enum/company-type.enum';
import { BaseDto } from '../../dto/base.dto';
import { gstRegex } from '../user.regex';

class BaseEnterpriseDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsEnum(CompanyTypeEnum)
  companyType: string;

  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;
}

export class AdminEnterpriseDto extends BaseEnterpriseDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails: BankDetailsDto;

  @IsNotEmpty()
  @Matches(gstRegex)
  gstNumber: string;
}

export class StaffEnterpriseDto extends BaseEnterpriseDto {}

export type EnterpriseDto = AdminEnterpriseDto | StaffEnterpriseDto;
