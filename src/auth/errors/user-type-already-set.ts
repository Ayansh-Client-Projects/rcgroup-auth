import HttpStatusCode from '../../error/http-status-code-enum';
import BaseError from '../../error/base-error';

export class UserTypeAlreadySet extends BaseError {
  constructor(message?: string) {
    super(
      UserTypeAlreadySet.name,
      HttpStatusCode.FORBIDDEN,
      false,
      message ?? 'User type already set',
    );
  }
}
