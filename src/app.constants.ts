export const Constants = {
  AUTHORIZATION_HEADER_NAME: 'authorization',
  USER_TYPE_KEY: 'userType',
  USER_TYPE_PLURAL_KEY: 'userTypes',
  USER_KEY: 'user',
  ALLOW_USER_WITHOUT_USER_TYPE_ROUTES: [
    { method: 'POST', url: '/user/claims' },
  ],
} as const;
