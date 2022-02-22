import { BankDetailsDto } from './../../dto/bank-details.dto';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CompanyTypeEnum } from '../../enum/company-type.enum';
import { BaseDto } from './../../../dto/base.dto';
import { gstRegex } from '../../user.regex';

export class AdminEnterpriseDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsEnum(CompanyTypeEnum)
  companyType: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails: BankDetailsDto;

  @IsNotEmpty()
  @Matches(gstRegex)
  gstNumber: string;
}
