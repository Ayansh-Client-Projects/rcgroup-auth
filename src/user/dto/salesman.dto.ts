import { BankDetailsDto } from './bank-details.dto';
import { Type } from 'class-transformer';
import { IsDefined, Matches, ValidateNested } from 'class-validator';
import { UserDto } from './user.dto';
import { panRegex, aadhaarRegex } from '../user.regex';

export class SalesmanDto extends UserDto {
  @Matches(panRegex)
  panNumber: string;

  @Matches(aadhaarRegex)
  aadhaarNumber: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails: BankDetailsDto;
}
