import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestLogService } from './request-log.service';
import * as moment from 'moment-timezone';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly requestLogService: RequestLogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', async () => {
      const duration = Date.now() - start;
      const timestamp = moment().tz('America/Sao_Paulo').toDate(); 

      await this.requestLogService.createLog(req.originalUrl, req.method, duration, timestamp);
    });

    next();
  }
}
