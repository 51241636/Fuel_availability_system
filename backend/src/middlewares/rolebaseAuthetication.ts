 import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./authMiddleware";

export const roleAuthenticate=(...userRole:string[])=>{
    return(req:AuthRequest,res:Response,next:NextFunction)=>{
        console.log("request user role : ",req.userRole)
        console.log("authenticate role : ",userRole)

        if(!req.userRole || !userRole.some((role)=> role.toLowerCase() === req.userRole?.toLowerCase())){
            console.log("access denied")
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
        next();
    }
}