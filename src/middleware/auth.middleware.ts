import { AuthService } from '../auth/services/auth.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Constants } from '../app.constants';
import { NextFunction } from 'express';
import { asyncLocalStorage } from '../utils/async-local-storage';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly authService: AuthService) {}

  public async use(req: Request, _: Response, next: NextFunction) {
    const authorization: string =
      req.headers[Constants.AUTHORIZATION_HEADER_NAME];
    if (!authorization) {
      throw new BadRequestException('Missing authorization header');
    }

    const token = authorization.split(' ')[1];

    const { error, data: user } = await this.authService.getDecodedToken(token);
    if (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
    asyncLocalStorage.getStore()?.set(Constants.USER_KEY, user);
    this.logger.debug({ user });

    next();
  }
}
