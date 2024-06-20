import { Controller, Get, Query } from '@nestjs/common';
import { RequestLogService } from './request-log.service';
import { RequestLog } from './request-log.interface';

@Controller('logs')
export class RequestLogController {
  constructor(private readonly requestLogService: RequestLogService) {}

  @Get()
  async getAllLogs(@Query('limit') limit?: number, @Query('route') route?: string): Promise<RequestLog[]> {
    return this.requestLogService.findAll({ limit, route });
  }
}
