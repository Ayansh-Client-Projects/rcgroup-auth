import { validate } from 'class-validator';
import { UserHelperService } from './user-helper.service';
import { Injectable } from '@nestjs/common';
import { getUserAuthId } from '../utils/user.util';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userHelperService: UserHelperService) {}

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

  async createUser(user: UserDto): Promise<UserDto> {
    await validate(Object.create(user), { skipNullProperties: true });
    return this.userHelperService.getUserService().updateUser(user);
  }
}
