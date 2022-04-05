import { BadRequestException } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Constants } from '../../app.constants';
import { UserTypeEnum } from '../../auth/enum/user-type.enum';
import { asyncLocalStorage } from '../../utils/async-local-storage';

export const getUserEmail = (required = true): string | undefined => {
  const user: DecodedIdToken = getFirebaseUser();
  if (required && user.email === undefined) {
    throw new BadRequestException('User does not have email ID set');
  }
  return user.email;
};

export const getUserAuthId = (): string => {
  const user: DecodedIdToken = getFirebaseUser();
  return user.uid;
};

export const getUserType = (): UserTypeEnum => {
  return UserTypeEnum[
    asyncLocalStorage.getStore()?.get(Constants.USER_KEY)[
      Constants.USER_TYPE_KEY
    ]
  ];
};

export const getFirebaseUser = (): DecodedIdToken => {
  return asyncLocalStorage.getStore()?.get(Constants.USER_KEY);
};
