import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../util/jwtToken";
import { userRoles } from "../enums/userRoleEnum";


export interface AuthRequest extends Request{
    userId?:string,
    userRole?:string
}

export const authenticate=(req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
        message: "Authorization header is required"
    });
    }

    const token=authHeader.split(" ")[1];

    if (!token) {
     
    return res.status(401).json({
        message: "Invalid authorization header"
    });
}
try{
    const decode=jwt.verify(
        token,
        process.env.JWT_SECRET!
    )as JwtPayload


    req.userId=decode.userId;
    req.userRole=decode.userRole;
    next();
}catch(error){
    console.log(error)
    return res.status(401).json({
        message: "Invalid or expired token"
    });
}

}