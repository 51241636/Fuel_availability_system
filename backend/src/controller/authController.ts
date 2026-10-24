import { Request, Response } from "express";
import user from "../models/user";
import { generateAccessToken, JwtPayload,generateRefreshToken } from "../util/jwtToken";
import { AuthDTO } from "../DTO/authDTO";
import { getMyDetailsService, loginService, saveUserService } from "../service/authService";
import { UserDTO } from "../DTO/userDTO";
import { AuthRequest } from "../middlewares/authMiddleware";



export const login=async(req:Request,res:Response)=>{
        try{
            const authDTO:AuthDTO=req.body;
            console.log("authdto",authDTO)
            const result=await loginService(authDTO)
            console.log("result : ",result)

              await res.cookie("refreshToken", (await result).refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            secure:false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
        message:"user logging successfully",
        accessToken:(await result).accessToken,
        userData:(await result).loginUserDetails
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

export const getMyDetails=async(req:AuthRequest,res:Response)=>{
    try{
        if (!req.userId) {
    
        return res.status(401).json({ message: "Unauthorized" });
        }
    const loggedUserDetail=await getMyDetailsService(req.userId);
     res.status(200).json({
            myDetails:loggedUserDetail
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