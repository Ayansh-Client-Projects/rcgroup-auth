import { Injectable } from '@nestjs/common';
import * as Firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import { handle, HandledPromise } from '../../utils/handle-promise';
import { FirebaseCustomClaims } from '../interfaces/firebase-custom-claims';

@Injectable()
export class FirebaseService {
  async addCustomClaims(
    uid: string,
    claims: FirebaseCustomClaims,
  ): HandledPromise<void> {
    return handle(Firebase.auth().setCustomUserClaims(uid, claims));
  }

  async verifyIdToken(token: string): HandledPromise<DecodedIdToken> {
    return handle(Firebase.auth().verifyIdToken(token, true));
  }

  async getUser(uid: string): HandledPromise<UserRecord> {
    return handle(Firebase.auth().getUser(uid));
  }

  async invalidateSessionsForUser(uid: string): HandledPromise<void> {
    return handle(Firebase.auth().revokeRefreshTokens(uid));
  }

  async updateEmail(uid: string, email: string): HandledPromise<UserRecord> {
    return handle(Firebase.auth().updateUser(uid, { email }));
  }

  async getUserByEmail(email: string): HandledPromise<UserRecord> {
    return handle(Firebase.auth().getUserByEmail(email));
  }

  async getUserByPhoneNumber(phoneNumber: string): HandledPromise<UserRecord> {
    return handle(Firebase.auth().getUserByPhoneNumber(phoneNumber));
  }

  async deleteUser(uid: string): HandledPromise<void> {
    return handle(Firebase.auth().deleteUser(uid));
  }

  async createUser(
    phoneNumber: string,
    email: string,
    password: string,
  ): HandledPromise<UserRecord> {
    return handle(
      Firebase.auth().createUser({
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      }),
    );
  }
}
