import { AuthService } from './../../auth/services/auth.service';
import { Injectable } from '@nestjs/common';
import { Constants } from '../../app.constants';
import { setAslValue } from '../../utils/async-local-storage';
import { getUserEmail } from '../utils/user.util';

@Injectable()
export class UserCommonService {
  constructor(private readonly authService: AuthService) {}

  async updateUserEmail(uid: string, email: string): Promise<void> {
    if (getUserEmail() == email) return;

    const { data: user, error } = await this.authService.updateEmail(
      uid,
      email,
    );
    if (error) throw error;

    setAslValue(Constants.USER_KEY, user);
  }
}
