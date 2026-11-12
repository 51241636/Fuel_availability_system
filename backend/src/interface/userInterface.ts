import { Types } from "mongoose";
import { userRoles } from "../enums/userRoleEnum";
import { statusManage } from "../enums/statusManage";

export default interface IUser {
    _id?: Types.ObjectId;
    firstName:string
    userName: string;
    email: string;
    address:string;
    contact:string;
    password: string;
    image?: string;
    userRole:string
    paymentStatus:string;
    userStatus:statusManage

}