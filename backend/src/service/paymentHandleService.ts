import { deflate } from "zlib";

import { IPayment } from "../interface/paymentInterface";
import mongoose from "mongoose";
import Payment from "../Repository/payments";

export const  savePendingpayment=async(orderId:string,userId:mongoose .Types.ObjectId,amount:number)=>{
    try{
        const currency = "LKR";
        const paymentData: IPayment = {
        orderId: orderId,
        userId: new mongoose.Types.ObjectId(userId),
        amount: amount,
        currency: currency,
        status: "PENDING"
        };
       const payment=new Payment(paymentData);
       return await payment.save();

    }catch(error){
        throw new Error("payment not saved successfully")
    }
}