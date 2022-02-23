import { EnterpriseService } from './enterprise.service';
import { UserHelperService } from './user-helper.service';
import { Injectable, Scope } from '@nestjs/common';
import { User } from '../user.type';
import { EnterpriseDto } from '../dto/enterprise.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    private readonly userHelperService: UserHelperService,
    private readonly enterpriseService: EnterpriseService,
  ) {}

  getUser(): User {
    return this.userHelperService.getUserService().getUser();
  }

  getEnterprise(id: string): EnterpriseDto {
    return this.enterpriseService.getEnterprise(
      id,
      this.userHelperService.getUserType(),
    );
  }
}
