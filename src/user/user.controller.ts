import { EnterpriseDto } from './dto/enterprise.dto';
import { IdDto } from './dto/id.dto';
import { UserService } from './services/user.service';
import { UserTypeEnum } from './../auth/enum/user-type.enum';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserTypes } from '../decorators/user-types.decorator';
import { UserTypeGuard } from '../guards/user-type.guard';

@Controller('user')
@UseGuards(UserTypeGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UserTypes(
    UserTypeEnum.ADMIN,
    UserTypeEnum.CUSTOMER,
    UserTypeEnum.SALESMAN,
    UserTypeEnum.STAFF,
  )
  getUser() {
    return this.userService.getUser();
  }

  @Get('/enterprise/:id')
  @UserTypes(UserTypeEnum.ADMIN)
  getEnterprise(@Param() idDto: IdDto): EnterpriseDto {
    return this.userService.getEnterprise(idDto.id);
  }
}
