import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { getAslValue } from '../utils/async-local-storage';

@Injectable()
export class CorrelationIdInResponseHeadersInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader(
      Constants.CORRELATION_ID_HEADER_NAME,
      getAslValue(Constants.CORRELATION_ID_HEADER_NAME),
    );
    return next.handle();
  }
}
