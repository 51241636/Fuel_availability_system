import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

export interface JwtPayload {
    userId: string;
    userRole: string;
}
export const generateAccessToken=(payload:JwtPayload)=>{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {
            expiresIn:(process.env.JWT_EXPIRES_IN)as StringValue || "15m"
        }
    )
}

export const generateRefreshToken=(payload:JwtPayload)=>{
    return jwt.sign(
        payload,
         process.env.JWT_REFRESH_SECRET!,
         {
            expiresIn:(process.env.JWT_REFRESH_EXPIRES)as StringValue || "7d" 
         }

    )
}