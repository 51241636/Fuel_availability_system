import { NextFunction, Request, Response } from "express";
import user from "../models/user";
import IUser from "../interface/userInterface";
import { UserDTO } from "../DTO/userDTO";
import { deleteUserService, getAllUsersService, updateUserSerivice } from "../service/userService";
import { json } from "stream/consumers";




// update saved user
export const updateUser=async(req:Request,res:Response,next:NextFunction)=>{
    const userDTO:UserDTO=req.body;
    console.log(userDTO.id);
    const updatedUser=await updateUserSerivice(userDTO);
     res.status(200).json({
            message:"User updated successfully",
            user:updatedUser
        });

}

// delete user 
// req: Request<{ id: string }>, parameter pass after define type
export const deleteUser=async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.params.id as string;
    const deleteUser=await deleteUserService(userId);
    res.status(200).json({
            message:"User updated successfully",
            user:deleteUser
        });
}

export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
    const allUsers=await getAllUsersService();
    res.status(200).json({
            json:allUsers
        });
}
