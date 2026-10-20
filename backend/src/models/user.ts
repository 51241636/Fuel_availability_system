import mongoose, { Schema } from "mongoose";
import IUser from "../interface/userInterface";
import { userRoles } from "../enums/userRoleEnum";
import { statusManage } from "../enums/statusManage";


const userSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
     email: {
        type: String,
        required: [true,'Email address is required'],
        unique: true,
        trim: true,                                    // Removes leading/trailing whitespace
        lowercase: true,   
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
     address:{
        type:String,
        required:true
     },
    contact:{
        type:String,
        required:true,
         match: [/^\d{10}$/, 'Please fill a valid 10-digit phone number']
    },

    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        // enum:Object.values(userRoles),
        required: true
    },
    userStatus: {
        type: String,
        enum: Object.values(statusManage),
        required: true,
        default: statusManage.ACTIVE
    }

})

const user=mongoose.model<IUser>("User",userSchema);
export default user;