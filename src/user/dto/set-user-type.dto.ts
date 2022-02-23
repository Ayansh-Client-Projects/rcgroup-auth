import { IsEnum, IsNotEmpty } from 'class-validator';
import { Constants } from '../../app.constants';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';

export class SetUserTypeDto {
  @IsEnum(UserTypeEnum)
  @IsNotEmpty()
  [Constants.USER_TYPE_KEY]: UserTypeEnum;
}
