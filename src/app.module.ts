import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config/config.schema';
import { EnvironmentVariablesEnum } from './config/environment-variables.enum';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get(EnvironmentVariablesEnum.DB_HOST),
          port: configService.get(EnvironmentVariablesEnum.DB_PORT),
          username: configService.get(EnvironmentVariablesEnum.DB_USERNAME),
          password: configService.get(EnvironmentVariablesEnum.DB_PASSWORD),
          database: configService.get(EnvironmentVariablesEnum.DB_DATABASE),
          schema: configService.get(EnvironmentVariablesEnum.DB_SCHEMA),
        };
      },
    }),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware, AuthMiddleware).forRoutes('/');
  }
}
