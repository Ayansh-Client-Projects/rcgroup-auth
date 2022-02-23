import { UserHelperService } from './user-helper.service';
import { Injectable } from '@nestjs/common';
import { User } from '../user.type';

@Injectable()
export class UserService {
  constructor(private readonly userHelperService: UserHelperService) {}

  getUser(): User {
    return this.userHelperService.getUserService().getUser();
  }

  getUserById(id: string): User {
    return this.userHelperService.getUserService().getUserById(id);
  }

  updateUser(user: User): User {
    return this.userHelperService.getUserService().updateUser(user);
  }
}
