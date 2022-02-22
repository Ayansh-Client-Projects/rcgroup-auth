import { BankDetailsDto } from './../../dto/bank-details.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from './../../dto/user.dto';

export class SalesmanDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  panNumber: string;

  @IsNotEmpty()
  @IsString()
  aadhaarNumber: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails: BankDetailsDto;
}
