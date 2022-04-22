import { AuthService } from '../auth/services/auth.service';
import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Constants } from '../app.constants';
import { NextFunction } from 'express';
import { setAslValue } from '../utils/async-local-storage';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  private readonly noAuthRequiredEndpoints = [
    { path: '/user', method: 'POST' },
    { path: '/user/', method: 'POST' },
  ];

  constructor(private readonly authService: AuthService) {}

  public async use(req: Request, _: Response, next: NextFunction) {
    if (this.isAuthRequired(req)) {
      const authHeader: string =
        req.headers[Constants.AUTHORIZATION_HEADER_NAME];
      if (!authHeader) {
        throw new UnauthorizedException('Missing authorization header');
      }

      const authTokenSplit = authHeader.split(' ');
      if (authTokenSplit.length !== 2) {
        this.logger.error('Invalid authorizarion header: ' + authHeader);
        throw new UnauthorizedException('Invalid authorizarion header');
      }

      const token = authTokenSplit[1];

      const { error, data: user } = await this.authService.getDecodedToken(
        token,
      );
      if (error) {
        this.logger.error(error);
        throw new UnauthorizedException('Invalid authorizarion header');
      }

      setAslValue(Constants.USER_KEY, user);
      this.logger.debug({ user });
    } else {
      this.logger.log('Request path does not require authentication');
    }
    next();
  }

  private isAuthRequired(req: Request): boolean {
    this.logger.log(req.method, req.url);
    return (
      this.noAuthRequiredEndpoints.findIndex(
        (x) => x.method === req.method && x.path === req.url,
      ) === -1
    );
  }
}
