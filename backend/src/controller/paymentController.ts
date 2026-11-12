import { Request, Response } from "express";
import crypto from "crypto";
import { verifyPayHereNotification } from "../service/PaymentNotify";
import Payment from "../Repository/payments";
import user from "../Repository/user";



// =====================================
// 2. PAYHERE NOTIFICATION
// =====================================

export const payHereNotify = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    // Verify merchant ID
    await console.log("casjndkjsndkansdkjandkjanksdnaknd",status_code)
    if (
      merchant_id !== process.env.PAYHERE_MERCHANT_ID
    ) {
      return res.status(400).send("Invalid merchant");
    }

    // Verify PayHere notification signature
    const isValid = verifyPayHereNotification(
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      String(status_code),
      md5sig
    );

    if (!isValid) {
      return res.status(400).send("Invalid signature");
    }

    // Find payment in MongoDB
    const payment = await Payment.findOne({
      orderId: order_id,
    });

    const userId = payment?.userId.toString();
    if(!userId){
      return res.status(400).send("user id is null can process payment");
    }

    const findUser=await user.findById(userId);

    if(!findUser){
      return res.status(400).send("user not match for payment");
    }
  

    





    if (!payment) {
      return res.status(404).send("Payment not found");
    }

    // Verify amount and currency
    if (
      Number(payhere_amount).toFixed(2) !==
        payment.amount.toFixed(2) ||
      payhere_currency !== payment.currency
    ) {
      return res.status(400).send("Payment mismatch");
    }

    // Prevent duplicate successful notification
    if (payment.status === "SUCCESS") {
    
      return res.status(200).send("Already processed");
    }

    // PayHere payment status
    if (String(status_code) === "2") {

      payment.status = "SUCCESS";
      findUser.paymentStatus="SUCCESS";
      payment.paymentId = String(payment_id);
      
      

    } else if (String(status_code) === "-1") {

      payment.status = "CANCELLED";
      findUser.paymentStatus="CANCELLED"

    } else if (String(status_code) === "-2") {

      payment.status = "FAILED";
      findUser.paymentStatus ="FAILED"

    } else {
      // Do not mark unknown or pending status as paid
      return res.status(200).send("Notification received");
    }   
    await findUser.save();
    await payment.save();

    // payment.statusCode = String(status_code);


    return res.status(200).send(
      "Payment notification processed successfully"
    );

  } catch (error) {
    console.error("PayHere Notification Error:", error);

    return res.status(500).send(
      "Notification processing failed"
    );
  }
};