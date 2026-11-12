import { NextFunction, Request, Response } from "express";
import user from "../Repository/user";
import IUser from "../interface/userInterface";
import { UserDTO } from "../DTO/userDTO";
import { ChangePassword, deleteUserService, getAllUsersService, updateUserSerivice } from "../service/userService";
import { json } from "stream/consumers";
import { AuthRequest } from "../middlewares/authMiddleware";




// update saved user
export const updateUser=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const userDTO:UserDTO=req.body;
    const imagePath=req.file?.filename;
    console.log("userData",userDTO)
    const updatedUser=await updateUserSerivice(userDTO,imagePath);
     res.status(200).json({
            message:"User updated successfully",
            user:updatedUser
        });
    }catch(error){
        console.log(error)
             res.status(200).json({
                message:"user details not update successfully"
            });
    }

}

// change user password using currnt password
export const changePassword=async(req:AuthRequest,res:Response)=>{
    try{
        const userId=req.userId;
        const{currentPassword,newPassword}=req.body;
        if(!userId){
            throw new Error("user id not found")
        }
        if(!currentPassword || !newPassword){
            throw new Error("current password or new password is null")
        }
        const response=await ChangePassword(userId,currentPassword,newPassword)
         res.status(200).json({
            message:response
        });
    }catch(error){
             res.status(200).json({
                message:"user password not changed"
            });
    }
}

// delete user 
// req: Request<{ id: string }>, parameter pass after define type
export const deleteUser=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const userId=req.params.id as string;
    const deleteUser=await deleteUserService(userId);
    res.status(200).json({
            message:"User updated successfully",
            user:deleteUser
        });
}

export const getAllUsers=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const allUsers=await getAllUsersService();
    res.status(200).json({
            json:allUsers
        });
}
