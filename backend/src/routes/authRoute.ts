import { Router } from "express";
import { login, registerUser } from "../controller/authController";
// import { registerUser } from "../controller/userController";

const authRouter = Router();
authRouter.post("/registerUser", registerUser);
authRouter.post("/loginUser",login)

export default authRouter;