import { AuthService } from '../auth/services/auth.service';
import {
  BadRequestException,
  Injectable,
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
    const authHeader: string = req.headers[Constants.AUTHORIZATION_HEADER_NAME];
    if (!authHeader) {
      throw new BadRequestException('Missing authorization header');
    }

    const authTokenSplit = authHeader.split(' ');
    if (authTokenSplit.length != 2) {
      this.logger.error('Invalid authorizarion header: ' + authHeader);
      throw new BadRequestException('Invalid authorizarion header');
    }

    const token = authTokenSplit[1];

    const { error, data: user } = await this.authService.getDecodedToken(token);
    if (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid authorizarion header');
    }

    asyncLocalStorage.getStore()?.set(Constants.USER_KEY, user);
    this.logger.debug({ user });

    next();
  }
}
