import { Router } from "express";
import { payHereNotify } from "../controller/paymentController";

const paymentRouter = Router();

paymentRouter.post("/payment/notify",payHereNotify)


export default paymentRouter;