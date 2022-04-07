import { getAslValue } from './../utils/async-local-storage';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Constants } from '../app.constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const exceptionResponse = exception.getResponse();

    response
      .setHeader(
        Constants.CORRELATION_ID_HEADER_NAME,
        getAslValue(Constants.CORRELATION_ID_HEADER_NAME),
      )
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message,
        exceptionResponse,
      });
  }
}
