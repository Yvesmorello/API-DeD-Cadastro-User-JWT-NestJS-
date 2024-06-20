import { Schema } from 'mongoose';

export const RequestLogSchema = new Schema({
  route: { type: String, required: true },
  method: { type: String, required: true },
  responseTime: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});
