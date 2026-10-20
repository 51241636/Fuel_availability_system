import { Types } from "mongoose";

export interface UserDTO {
    id?: string;
    name: string;
    email: string;
    address:string;
    contact:string;
    password: string;
    userRole:string
}