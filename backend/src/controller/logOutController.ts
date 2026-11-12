import { Response } from "express"
import { AuthRequest } from "../middlewares/authMiddleware"

export const LogOutController=async(req:AuthRequest,res:Response)=>{
    try{
             res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/"
                });

                return res.status(200).json({
                    message: "Logout successful"
                    });

    }catch(error){
        console.log(error)
            
            return res.status(500).json({
                
                 message:"logout failed"
            })
    }
}