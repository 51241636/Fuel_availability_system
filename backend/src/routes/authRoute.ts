import { Router } from "express";
import { getMyDetails, login, registerUser } from "../controller/authController";
import { authenticate } from "../middlewares/authMiddleware";
import { newAccessToken } from "../util/refreshToken";
// import { registerUser } from "../controller/userController";

const authRouter = Router();
authRouter.post("/registerUser", registerUser);
authRouter.post("/loginUser",login)
authRouter.get("/getMyDetails",authenticate,getMyDetails)
authRouter.post("/newAccessToken",newAccessToken);


export default authRouter;