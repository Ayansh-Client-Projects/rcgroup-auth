import { IsEnum } from 'class-validator';
import { Constants } from '../../app.constants';
import { UserTypeEnum } from '../enum/user-type.enum';

export class CreateUserDto {
  @IsEnum(UserTypeEnum)
  [Constants.USER_TYPE_KEY]: UserTypeEnum;
}
