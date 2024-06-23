
import { Request } from "express";
import { User } from "../../users/interface/user.interface"

export interface AuthRequest extends Request{
    user:User;
}
