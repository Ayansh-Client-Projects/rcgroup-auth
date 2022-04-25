import { AuthService } from './../../auth/services/auth.service';
import { validate } from 'class-validator';
import { UserHelperService } from './user-helper.service';
import { Injectable, Logger } from '@nestjs/common';
import { getUserAuthId } from '../utils/user.util';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/user-create.dto';
import { handle } from '../../utils/handle-promise';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userHelperService: UserHelperService,
    private readonly authService: AuthService,
  ) {}

  getUser(): Promise<UserDto> {
    return this.getUserByAuthId(getUserAuthId());
  }

  getUserByAuthId(authId: string): Promise<UserDto> {
    return this.userHelperService.getUserService().getUserByAuthId(authId);
  }

  getUserById(id: string): Promise<UserDto> {
    return this.userHelperService.getUserService().getUserById(id);
  }

  async updateUser(user: UserDto): Promise<UserDto> {
    await validate(Object.create(user), { skipNullProperties: true });
    return this.userHelperService.getUserService().updateUser(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const authUser = await this.authService.createUser(
      createUserDto.user.phoneNumber,
      createUserDto.user.email,
      createUserDto.user.password,
      createUserDto.user.userType,
    );

    if (authUser.error) {
      throw authUser.error;
    }

    const { error, data: dbUser } = await handle(
      this.userHelperService
        .getUserServiceByUserType(createUserDto.user.userType)
        .createUser(createUserDto.user, authUser.data.uid),
    );

    if (error) {
      await this.authService.deleteUser(authUser.data.uid);
      throw error;
    }

    this.logger.log({ dbUser });
  }
}
