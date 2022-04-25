import { UserDto } from './user.dto';
import { aadhaarRegex } from '../user.regex';
import { CompanyTypeEnum } from '../enum/company-type.enum';
import { IsNotEmpty, IsString, IsEnum, Matches } from 'class-validator';
import { gstRegex } from '../user.regex';

export class CustomerDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsEnum(CompanyTypeEnum)
  companyType: CompanyTypeEnum;

  @Matches(gstRegex)
  gstNumber: string;

  @Matches(aadhaarRegex)
  aadhaarNumber: string;
}
