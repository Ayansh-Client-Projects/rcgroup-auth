import {
  AdminEnterpriseDto,
  EnterpriseDto,
  StaffEnterpriseDto,
} from './dto/enterprise.dto';
import { IdDto } from './dto/id.dto';
import { UserService } from './services/user.service';
import { UserTypeEnum } from './../auth/enum/user-type.enum';
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserTypes } from '../decorators/user-types.decorator';
import { UserTypeGuard } from '../guards/user-type.guard';
import { EnterpriseService } from './services/enterprise.service';
import { UserDto } from './user.type';
import { AuthService } from '../auth/services/auth.service';
import { SetUserTypeDto } from './dto/set-user-type.dto';
import { getUserAuthId } from './utils/user.util';

@Controller('user')
@UseGuards(UserTypeGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly enterpriseService: EnterpriseService,
  ) {}

  @Get('/')
  @UserTypes(
    UserTypeEnum.ADMIN,
    UserTypeEnum.CUSTOMER,
    UserTypeEnum.SALESMAN,
    UserTypeEnum.STAFF,
  )
  getUser(): Promise<UserDto> {
    return this.userService.getUser();
  }

  @Get('/:id')
  @UserTypes(UserTypeEnum.ADMIN, UserTypeEnum.SALESMAN, UserTypeEnum.STAFF)
  getUserById(@Param() idDto: IdDto): Promise<UserDto> {
    return this.userService.getUserById(idDto.id);
  }

  @Patch('/userType')
  async setUserType(@Body() setUserTypeDto: SetUserTypeDto): Promise<void> {
    await this.authService.addUserTypeClaim(
      getUserAuthId(),
      setUserTypeDto.userType,
    );
  }

  @Patch('/')
  @UserTypes(
    UserTypeEnum.ADMIN,
    UserTypeEnum.CUSTOMER,
    UserTypeEnum.SALESMAN,
    UserTypeEnum.STAFF,
  )
  updateUser(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.updateUser(user);
  }

  @Get('/enterprises')
  @UserTypes(UserTypeEnum.ADMIN, UserTypeEnum.STAFF)
  getAllEnterprises(): Array<StaffEnterpriseDto> {
    return this.enterpriseService.getAllEnterprises();
  }

  @Get('/enterprises/:id')
  @UserTypes(UserTypeEnum.ADMIN)
  getEnterprise(@Param() idDto: IdDto): EnterpriseDto {
    return this.enterpriseService.getEnterprise(idDto.id);
  }

  @Patch('/enterprises/:id')
  @UserTypes(UserTypeEnum.ADMIN)
  updateEnterprise(
    @Body() adminEnterpriseDto: AdminEnterpriseDto,
  ): EnterpriseDto {
    return this.enterpriseService.updateEnterprise(adminEnterpriseDto);
  }
}
