import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config/config.schema';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      expandVariables: true,
      validationSchema: configValidationSchema,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
