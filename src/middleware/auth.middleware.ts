import { AuthService } from '../auth/services/auth.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Constants } from '../app.constants';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
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
      // TODO log error
      console.error(error);
      throw new InternalServerErrorException();
    }
    req[Constants.USER_KEY] = user!;
    console.log({ user });

    next();
  }
}
