import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import { HandledPromise } from '../../utils/handle-promise';
import { UserTypeEnum } from '../enum/user-type.enum';
import { FirebaseService } from './firebase.service';
import { UserDoesNotExistError } from '../errors/user-does-not-exist';
import { UserTypeAlreadySet } from '../errors/user-type-already-set';
import { Constants } from '../../app.constants';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  getDecodedToken(token: string) {
    return this.firebaseService.verifyIdToken(token);
  }

  getUser(uid: string): HandledPromise<UserRecord> {
    return this.firebaseService.getUser(uid);
  }

  async addUserTypeClaim(
    uid: string,
    userType: UserTypeEnum,
  ): HandledPromise<void> {
    const { error, data: user } = await this.getUser(uid);
    if (error) {
      throw error;
    }
    if (user == null) {
      throw new UserDoesNotExistError();
    }

    // if user type is null or undefined
    // https://stackoverflow.com/questions/2647867/how-can-i-determine-if-a-variable-is-undefined-or-null
    if (user?.customClaims?.[Constants.USER_TYPE_KEY] !== undefined) {
      // throw error user already has userType assigned
      throw new UserTypeAlreadySet();
    }
    await this.firebaseService.addCustomClaims(uid, {
      ...(user?.customClaims ?? {}),
      userType,
    });

    return this.firebaseService.invalidateSessionsForUser(uid);
  }
}
