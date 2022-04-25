import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Constants } from '../app.constants';
import { asyncLocalStorage, setAslValue } from '../utils/async-local-storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  public async use(req: Request, _: Response, next: NextFunction) {
    asyncLocalStorage.run(new Map(), () => {
      const reqCorrelationId =
        req.headers[Constants.CORRELATION_ID_HEADER_NAME] ?? uuidv4();
      setAslValue(Constants.CORRELATION_ID_HEADER_NAME, reqCorrelationId);
      next();
    });
  }
}
