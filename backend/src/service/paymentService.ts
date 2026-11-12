    import crypto from "crypto";

    export const paymentService=(orderId:string,amount: number,currency: string)=>{

        const merchentId = process.env.PAYHERE_MERCHANT_ID!;
        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;

         if (!merchantSecret) {
            throw new Error("PayHere merchant secret is missing");
        }

        if (!merchentId) {
            throw new Error("PayHere merchant Id is missing");
        }


         const hashedSecret = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

    const formattedAmount = amount.toFixed(2);


     return crypto
    .createHash("md5")
    .update(
      merchentId +
      orderId +
      formattedAmount +
      currency +
      hashedSecret
    )
    .digest("hex")
    .toUpperCase();


    }
