import { AdminEnterpriseDto } from './admin/dto/admin-enterprise.dto';
import { IdDto } from './dto/id.dto';
import { AdminService } from './admin/admin.service';
import { UserService } from './user.service';
import { UserTypeEnum } from './../auth/enum/user-type.enum';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserTypes } from '../decorators/user-types.decorator';
import { UserTypeGuard } from '../guards/user-type.guard';

@Controller('user')
@UseGuards(UserTypeGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}

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
  getAdminEnterprise(@Param() idDto: IdDto): AdminEnterpriseDto {
    return this.adminService.getAdminEnterprise(idDto.id);
  }
}
