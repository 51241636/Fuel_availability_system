
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import type { JwtPayload } from "./jwtToken";

export const newAccessToken = (
  req: Request,
  res: Response
): Response => {
  try {
    // Get refresh token from the cookie
    const refreshToken = req.cookies?.refreshToken;
    console.log("refresh token : ",refreshToken)
    

    if (!refreshToken) {
        console.log("callifgg")
      return res.status(401).json({
        message: "Refresh token missing or expired",
      });
    }

    // Verify the refresh token
    const verified = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;

    // Create a new access token payload
    const payload: JwtPayload = {
      userId: verified.userId,
      userRole: verified.userRole,
    };

    // Generate a new access token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn:
          (process.env.JWT_EXPIRES_IN as StringValue) || "15m",
      }
    );

    // Return the new access token
    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};
