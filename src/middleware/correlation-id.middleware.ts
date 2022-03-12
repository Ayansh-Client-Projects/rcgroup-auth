import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Constants } from '../app.constants';
import { asyncLocalStorage } from '../utils/async-local-storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  public async use(req: Request, _: Response, next: NextFunction) {
    asyncLocalStorage.run(new Map(), () => {
      const reqCorrelationId =
        req.headers.get(Constants.CORRELATION_ID_HEADER_NAME) ?? uuidv4();
      asyncLocalStorage.getStore()?.set('x-correlation-id', reqCorrelationId);
      next();
    });
  }
}
