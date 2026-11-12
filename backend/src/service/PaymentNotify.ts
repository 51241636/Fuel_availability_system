    import crypto from "crypto";

export const verifyPayHereNotification = (
  merchantId: string,
  orderId: string,
  payhereAmount: string,
  payhereCurrency: string,
  statusCode: string,
  receivedMd5sig: string
): boolean => {

  const merchantSecret =
    process.env.PAYHERE_MERCHANT_SECRET;

  if (!merchantSecret) {
    throw new Error("Merchant secret is missing");
  }

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  const localMd5sig = crypto
    .createHash("md5")
    .update(
      merchantId +
      orderId +
      payhereAmount +
      payhereCurrency +
      statusCode +
      hashedSecret
    )
    .digest("hex")
    .toUpperCase();

  return (
    localMd5sig === receivedMd5sig.toUpperCase()
  );
};