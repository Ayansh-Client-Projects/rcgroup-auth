import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../dto/base.dto';

export class BankDetailsDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  accountHolderName: string;

  @IsNotEmpty()
  @IsString()
  ifscCode: string;

  @IsNotEmpty()
  @IsNumber()
  accountNumber: number;
}
