import { Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./jwtToken";
import type { StringValue } from "ms";
// import {JwtPayload} from ""

export const newAccessToken=(req:Request,res:Response)=>{
    try{
        if(req.cookies?.refreshToken){
        const refreshToken=req.cookies?.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                message:"refresh token missing or expired"
            })
        }
        const verified=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET!) as JwtPayload
            if(!verified){
                 return res.status(401).json({
                message:"refresh token not verified"
            })
            }
            const payload:JwtPayload={
                userId:verified.userId,
                userRole:verified.userRole
            }
            if(!payload){
                return res.status(401).json({
                message:"invalid payload cant create new access token"
            })
            }
             const token= jwt.sign(
                    payload,
                    process.env.JWT_SECRET!,
                    {
                        expiresIn:(process.env.JWT_EXPIRES_IN)as StringValue || "15m"
                    }
                )

                return res.status(200).json({
                token
            })

    
        
    }
    }catch(error){
        return res.status(500).json({
                message:"something went wrong"
            })
    }
}