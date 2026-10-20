import { Request, Response } from "express";
import user from "../models/user";
import { generateAccessToken, JwtPayload,generateRefreshToken } from "../util/jwtToken";
import { AuthDTO } from "../DTO/authDTO";
import { loginService, saveUserService } from "../service/authService";
import { UserDTO } from "../DTO/userDTO";



export const login=async(req:Request,res:Response)=>{
        try{
            const authDTO:AuthDTO=req.body;
            console.log(authDTO)
            const result=loginService(authDTO)

              await res.cookie("refreshToken", (await result).refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            secure:false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
        message:"user logging successfully",
        accessToken:(await result).accessToken
    })
  
        }catch(error){
                const message=error instanceof Error ? error.message :"login failed"
                const status=message === "user not found or user password not correct" || "username and password reqired" ? 404 :401;
                return res.status(status).json({
                    success:false,
                    message
                })
        }
}   

// register new  user 
export const registerUser=async (req:Request,res:Response)=>{
        try{
            const userDTO:UserDTO=req.body;
        console.log(userDTO);
        const saved= await saveUserService(userDTO);
        res.status(200).json({
            message:"User saved successfully",
            user:saved
        });

        }catch(error){
            const message=error instanceof Error ? error.message : "something went wrong"
            const status =404
            return res.status(status).json({
                 success:false,
                 message
            })
        }
   
}