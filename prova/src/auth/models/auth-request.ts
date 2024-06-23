
import { Request } from "express";
import { User } from "src/users/interface/user.interface";

export interface AuthRequest extends Request{
    user:User;
}
