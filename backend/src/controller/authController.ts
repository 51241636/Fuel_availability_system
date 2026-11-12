import { Request, Response } from "express";
import user from "../Repository/user";
import { generateAccessToken, JwtPayload,generateRefreshToken } from "../util/jwtToken";
import { AuthDTO } from "../DTO/authDTO";
import { getMyDetailsService, loginService, saveUserService } from "../service/authService";
import { UserDTO } from "../DTO/userDTO";
import { AuthRequest } from "../middlewares/authMiddleware";
import PaymentModel from "../Repository/payments";
import { savePendingpayment } from "../service/paymentHandleService";
import { paymentService } from "../service/paymentService";



export const login=async(req:Request,res:Response)=>{
        try{
            const authDTO:AuthDTO=req.body;
            const result=await loginService(authDTO)
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
        if(saved){
            if(saved.userRole == "owner"){
                    const orderId = `FUEL_${crypto.randomUUID()}`;
            const amount = 500;
            

           const savedPayment=await savePendingpayment(orderId,saved._id,amount);

           const merchantId = process.env.PAYHERE_MERCHANT_ID;

            if (!merchantId) {
            res.status(500).json({
                message: "PayHere merchant ID is not configured",
            });
            return;
            }

             if (!saved._id || !orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID and userId is required",
            });
            }

            const hash = paymentService(
                orderId,
                amount,
                savedPayment.currency
            );

            if(hash){
                res.status(201).json({
                    message: "Registration created. Complete payment to activate your account.",
                    role:saved.userRole,
                    paymentUrl: "https://sandbox.payhere.lk/pay/checkout",
                    payment: {
                        merchant_id: merchantId,
                        return_url: process.env.PAYHERE_RETURN_URL,
                        cancel_url: process.env.PAYHERE_CANCEL_URL,
                        notify_url: process.env.PAYHERE_NOTIFY_URL,

                        first_name: saved.firstName,
                        last_name: saved.firstName,  
                        email: saved.email,
                        phone: saved.contact,
                        address: saved.address,
                        city: saved.address,
                        country: "Sri Lanka",

                        order_id:orderId,
                        items: "Fuel Availability System Registration",
                        currency:savedPayment.currency,
                        amount: amount.toFixed(2),
                        hash
                    }

                })
            }
            }else{
                 res.status(201).json({
                    message: "Registration created.Completer customer registration",
                    role:saved.userRole,
                    data:saved
                })
            }
            
        }

        }catch(error){
             console.error("Customer registration error:", error);

            res.status(500).json({
                message: "Customer registration failed",
            });
                    }
   
}

export const getMyDetails=async(req:AuthRequest,res:Response)=>{
    try{
        if (!req.userId) {
    
        return res.status(401).json({ message: "Unauthorized" });
        }
    const loggedUserDetail=await getMyDetailsService(req.userId);
     res.status(200).json({
            myDetails:loggedUserDetail,
            image:loggedUserDetail?.image ? `http://localhost:3000/uploads/${loggedUserDetail.image}` : null
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