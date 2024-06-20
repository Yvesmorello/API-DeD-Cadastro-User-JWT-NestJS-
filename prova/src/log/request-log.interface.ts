import { Date, Document } from 'mongoose';

export interface RequestLog extends Document {
  route: string;
  method: string;
  responseTime: number;
  timestamp: Date;
}
