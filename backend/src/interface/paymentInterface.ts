import mongoose from "mongoose";

export interface IPayment {
  orderId: string;
  userId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  paymentId?: string;
}