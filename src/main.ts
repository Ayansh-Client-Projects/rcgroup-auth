import { NestFactory } from '@nestjs/core';
import * as Firebase from 'firebase-admin';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { EnvironmentVariablesEnum } from './config/environment-variables.enum';

const logger: Logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
    }),
  );
  const configService = app.get(ConfigService);

  Firebase.initializeApp({
    credential: Firebase.credential.cert({
      projectId: configService.get(
        EnvironmentVariablesEnum.FIREBASE_PROJECT_ID,
      ),
      clientEmail: configService.get(
        EnvironmentVariablesEnum.FIREBASE_PROJECT_ID,
      ),
      privateKey: configService.get(
        EnvironmentVariablesEnum.FIREBASE_PRIVATE_KEY,
      ),
    }),
  });

  const port = configService.get(EnvironmentVariablesEnum.PORT);
  const nodeEnv = configService.get(EnvironmentVariablesEnum.NODE_ENV);
  await app.listen(port);
  logger.log(`Applicaion started running on PORT: ${port} in ${nodeEnv}`);
}
bootstrap();
