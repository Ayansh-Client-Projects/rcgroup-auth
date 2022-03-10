import { UserDto } from './user.dto';
import { aadhaarRegex } from '../user.regex';
import { CompanyTypeEnum } from '../enum/company-type.enum';
import { IsNotEmpty, IsString, IsEnum, Matches } from 'class-validator';
import { gstRegex } from '../user.regex';

export class CustomerDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsEnum(CompanyTypeEnum)
  companyType: CompanyTypeEnum;

  @IsNotEmpty()
  @Matches(gstRegex)
  gstNumber: string;

  @IsNotEmpty()
  @Matches(aadhaarRegex)
  aadhaarNumber: string;
}
