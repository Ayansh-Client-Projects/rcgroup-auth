import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';

export class CreateUserDto {
  @IsPhoneNumber('IN')
  @IsDefined()
  mobileNumber: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDefined()
  @IsEnum(UserTypeEnum)
  userType: UserTypeEnum;
}
