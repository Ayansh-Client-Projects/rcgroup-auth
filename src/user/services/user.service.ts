import { UserHelperService } from './user-helper.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../user.type';
import { getUserAuthId } from '../utils/user.util';

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

  updateUser(user: UserDto): Promise<UserDto> {
    return this.userHelperService.getUserService().updateUser(user);
  }
}
