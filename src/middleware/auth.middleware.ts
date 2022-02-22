import { AuthService } from '../auth/services/auth.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Constants } from '../app.constants';
import { NextFunction } from 'express';

export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  public async use(req: Request, _: Response, next: NextFunction) {
    const authorization = req.headers[Constants.AUTHORIZATION_HEADER_NAME];
    if (!authorization) {
      throw new BadRequestException('Missing authorization header');
    }

    const { error, data: user } = await this.authService.getDecodedToken(
      authorization,
    );
    if (error) {
      // TODO log error
      throw new InternalServerErrorException();
    }
    req[Constants.USER_KEY] = user!;
    next();
  }
}
