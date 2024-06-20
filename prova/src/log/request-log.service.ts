import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestLog } from './request-log.interface';

@Injectable()
export class RequestLogService {
  constructor(@InjectModel('RequestLog') private readonly requestLogModel: Model<RequestLog>) {}

  async createLog(route: string, method: string, responseTime: number, timestamp: Date): Promise<RequestLog> {
    const log = new this.requestLogModel({ route, method, responseTime, timestamp: new Date(timestamp) });
    return await log.save();
  }

  async findAll(params: { limit?: number; route?: string } = {}): Promise<RequestLog[]> {
    const query = params.route ? { route: params.route } : {};
    const limit = params.limit ? params.limit : 0;
    return this.requestLogModel.find(query).limit(limit).exec();
  }
}
