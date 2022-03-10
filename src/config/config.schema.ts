import Joi from '@hapi/joi';

import { EnvironmentVariablesEnum } from './environment-variables.enum';

export const configValidationSchema = Joi.object({
  [EnvironmentVariablesEnum.PORT]: Joi.number().required(),
  [EnvironmentVariablesEnum.FIREBASE_PROJECT_ID]: Joi.string().required(),
  [EnvironmentVariablesEnum.FIREBASE_PRIVATE_KEY]: Joi.string().required(),
  [EnvironmentVariablesEnum.FIREBASE_CLIENT_EMAIL]: Joi.string()
    .email()
    .required(),
  [EnvironmentVariablesEnum.DB_HOST]: Joi.string().required(),
  [EnvironmentVariablesEnum.DB_PORT]: Joi.number().required(),
  [EnvironmentVariablesEnum.DB_USERNAME]: Joi.string().required(),
  [EnvironmentVariablesEnum.DB_PASSWORD]: Joi.string().required(),
  [EnvironmentVariablesEnum.DB_DATABASE]: Joi.string().required(),
});
