import { Document } from 'mongoose';

export interface User extends Document {
  _id: number;
  username: string;
  password: string;
}