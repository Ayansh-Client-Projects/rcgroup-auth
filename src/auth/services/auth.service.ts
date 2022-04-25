import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import { HandledPromise } from '../../utils/handle-promise';
import { UserTypeEnum } from '../enum/user-type.enum';
import { FirebaseService } from './firebase.service';
import { FirebaseErrorCodeEnum } from '../enum/firebase-error-code.enum';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  getDecodedToken(token: string) {
    return this.firebaseService.verifyIdToken(token);
  }

  getUser(uid: string): HandledPromise<UserRecord> {
    return this.firebaseService.getUser(uid);
  }

  async getUserByEmail(email: string): HandledPromise<UserRecord> {
    const response = await this.firebaseService.getUserByEmail(email);
    if (response.error) {
      if (response.error['code'] == FirebaseErrorCodeEnum.USER_NOT_FOUND) {
        response.error = new NotFoundException(
          'User with this email does not exist',
        );
      }
      if (response.error['code'] == FirebaseErrorCodeEnum.INVALID_EMAIL) {
        response.error = new BadRequestException('Email provided is invalid');
      }
    }
    return response;
  }

  async getUserByPhoneNumber(phoneNumber: string): HandledPromise<UserRecord> {
    const response = await this.firebaseService.getUserByPhoneNumber(
      phoneNumber,
    );
    if (response.error) {
      if (response.error['code'] == FirebaseErrorCodeEnum.USER_NOT_FOUND) {
        response.error = new NotFoundException(
          'User with this phone number does not exist',
        );
      }
      if (
        response.error['code'] == FirebaseErrorCodeEnum.INVALID_PHONE_NUMBER
      ) {
        response.error = new BadRequestException(
          'Phone number provided is invalid',
        );
      }
    }
    return response;
  }

  updateEmail(uid: string, email: string): HandledPromise<UserRecord> {
    return this.firebaseService.updateEmail(uid, email);
  }

  async doesUserExistWithEmailOrPhoneNumber(
    email: string,
    phoneNumber: string,
  ): Promise<boolean> {
    const completedPromises = await Promise.all([
      this.doesUserExistWithEmail(email),
      this.doesUserExistWithPhoneNumber(phoneNumber),
    ]);

    return completedPromises[0] || completedPromises[1];
  }

  private async doesUserExistWithEmail(email: string): Promise<boolean> {
    const response = await this.getUserByEmail(email);
    if (response.data) {
      return true;
    }
    return false;
  }

  private async doesUserExistWithPhoneNumber(
    phoneNumber: string,
  ): Promise<boolean> {
    const response = await this.getUserByPhoneNumber(phoneNumber);
    if (response.data) {
      return true;
    }
    return false;
  }

  async createUser(
    phoneNumber: string,
    email: string,
    password: string,
    userType: UserTypeEnum,
  ): HandledPromise<UserRecord> {
    const userExistsWithTheGivenEmailOrPhoneNumber =
      await this.doesUserExistWithEmailOrPhoneNumber(email, phoneNumber);

    if (userExistsWithTheGivenEmailOrPhoneNumber) {
      return {
        error: new BadRequestException(
          'User with the given email/phone number already exists',
        ),
        data: null,
      };
    }

    const firebaseUserResponse = await this.firebaseService.createUser(
      phoneNumber,
      email,
      password,
    );

    if (firebaseUserResponse.error) {
      throw firebaseUserResponse.error;
    }

    const setCustomClaimsResponse = await this.firebaseService.addCustomClaims(
      firebaseUserResponse.data.uid,
      { userType },
    );

    if (setCustomClaimsResponse.error) {
      await this.deleteUser(firebaseUserResponse.data.uid);
      throw setCustomClaimsResponse.error;
    }

    return firebaseUserResponse;
  }

  async deleteUser(uid: string): HandledPromise<void> {
    return this.firebaseService.deleteUser(uid);
  }
}
