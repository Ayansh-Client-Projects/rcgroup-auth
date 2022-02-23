import { AuthService } from '../auth/services/auth.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Constants } from '../app.constants';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  private userTypeExistsValidation(req: Request) {
    const allowUserWithoutUserType =
      Constants.ALLOW_USER_WITHOUT_USER_TYPE_ROUTES.find(
        (route) => req.url === route.url && req.method === route.method,
      ) !== undefined;
    if (
      !allowUserWithoutUserType &&
      req[Constants.USER_KEY]![Constants.USER_TYPE_KEY] === undefined
    ) {
      throw new UnauthorizedException();
    }
  }

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
    this.userTypeExistsValidation(req);

    next();
  }
}
