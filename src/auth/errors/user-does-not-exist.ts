import HttpStatusCode from '../../error/http-status-code-enum';
import BaseError from '../../error/base-error';

export class UserDoesNotExistError extends BaseError {
  constructor(message?: string) {
    super(
      UserDoesNotExistError.name,
      HttpStatusCode.BAD_REQUEST,
      false,
      message ?? 'User does not exist',
    );
  }
}
