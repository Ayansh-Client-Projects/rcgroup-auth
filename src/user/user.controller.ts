import { EnterpriseDto, StaffEnterpriseDto } from './dto/enterprise.dto';
import { IdDto } from './dto/id.dto';
import { UserService } from './services/user.service';
import { UserTypeEnum } from './../auth/enum/user-type.enum';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserTypes } from '../decorators/user-types.decorator';
import { UserTypeGuard } from '../guards/user-type.guard';
import { EnterpriseService } from './services/enterprise.service';
import { User } from './user.type';

@Controller('user')
@UseGuards(UserTypeGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly enterpriseService: EnterpriseService,
  ) {}

  @Get('/')
  @UserTypes(
    UserTypeEnum.ADMIN,
    UserTypeEnum.CUSTOMER,
    UserTypeEnum.SALESMAN,
    UserTypeEnum.STAFF,
  )
  getUser(): User {
    return this.userService.getUser();
  }

  @Get('/:id')
  @UserTypes(UserTypeEnum.ADMIN, UserTypeEnum.SALESMAN, UserTypeEnum.STAFF)
  getUserById(@Param() idDto: IdDto): User {
    return this.userService.getUserById(idDto.id);
  }

  @Get('/enterprises')
  @UserTypes(UserTypeEnum.ADMIN, UserTypeEnum.STAFF)
  getAllEnterprises(): Array<StaffEnterpriseDto> {
    return this.enterpriseService.getAllEnterprises();
  }

  @Get('/enterprises/:id')
  @UserTypes(UserTypeEnum.ADMIN)
  getEnterprise(@Param() idDto: IdDto): EnterpriseDto {
    return this.userService.getEnterprise(idDto.id);
  }
}
