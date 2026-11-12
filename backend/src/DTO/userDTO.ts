import { Types } from "mongoose";

export interface UserDTO {
    id?: string;
    firstName:string
    userName: string;
    email: string;
    address:string;
    contact:string;
    password: string;
    userRole:string
}