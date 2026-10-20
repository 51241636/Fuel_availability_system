import { Types } from "mongoose";
import { userRoles } from "../enums/userRoleEnum";
import { statusManage } from "../enums/statusManage";

export default interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    address:string;
    contact:string;
    password: string;
    userRole:string
    userStatus:statusManage
}