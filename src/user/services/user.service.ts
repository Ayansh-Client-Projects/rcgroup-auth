import { UserHelperService } from './user-helper.service';
import { Injectable, Scope } from '@nestjs/common';
import { User } from '../user.type';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(private readonly userHelperService: UserHelperService) {}

  getUser(): User {
    return this.userHelperService.getUserService().getUser();
  }

  getUserById(id: string): User {
    return this.userHelperService.getUserService().getUserById(id);
  }
}
