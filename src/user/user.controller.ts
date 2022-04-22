import {
  AdminEnterpriseDto,
  EnterpriseDto,
  StaffEnterpriseDto,
} from './dto/enterprise.dto';
import { IdDto } from './dto/id.dto';
import { UserService } from './services/user.service';
import { UserTypeEnum } from './../auth/enum/user-type.enum';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserTypes } from '../decorators/user-types.decorator';
import { UserTypeGuard } from '../guards/user-type.guard';
import { EnterpriseService } from './services/enterprise.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/user-create.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly enterpriseService: EnterpriseService,
  ) {}

  @Get('/')
  @UseGuards(UserTypeGuard)
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
  @UseGuards(UserTypeGuard)
  @UserTypes(UserTypeEnum.ADMIN, UserTypeEnum.SALESMAN, UserTypeEnum.STAFF)
  getUserById(@Param() idDto: IdDto): Promise<UserDto> {
    return this.userService.getUserById(idDto.id);
  }

  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/')
  @UseGuards(UserTypeGuard)
  @UserTypes(
    UserTypeEnum.ADMIN,
    UserTypeEnum.CUSTOMER,
    UserTypeEnum.SALESMAN,
    UserTypeEnum.STAFF,
  )
  updateUser(@Body() user: any): Promise<UserDto> {
    return this.userService.updateUser(user);
  }

  @Get('/enterprises')
  @UseGuards(UserTypeGuard)
  @UserTypes(UserTypeEnum.ADMIN, UserTypeEnum.STAFF)
  getAllEnterprises(): Array<StaffEnterpriseDto> {
    return this.enterpriseService.getAllEnterprises();
  }

  @Get('/enterprises/:id')
  @UseGuards(UserTypeGuard)
  @UserTypes(UserTypeEnum.ADMIN)
  getEnterprise(@Param() idDto: IdDto): EnterpriseDto {
    return this.enterpriseService.getEnterprise(idDto.id);
  }

  @Patch('/enterprises/:id')
  @UseGuards(UserTypeGuard)
  @UserTypes(UserTypeEnum.ADMIN)
  updateEnterprise(
    @Body() adminEnterpriseDto: AdminEnterpriseDto,
  ): EnterpriseDto {
    return this.enterpriseService.updateEnterprise(adminEnterpriseDto);
  }
}
