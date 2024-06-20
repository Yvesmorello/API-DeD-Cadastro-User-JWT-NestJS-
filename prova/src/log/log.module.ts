// src/log/log.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestLogSchema } from './request-log.schema';
import { RequestLogService } from './request-log.service';
import { RequestLogController } from './request-log.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'RequestLog', schema: RequestLogSchema }])],
  providers: [RequestLogService],
  controllers: [RequestLogController],
})
export class LogModule {}
