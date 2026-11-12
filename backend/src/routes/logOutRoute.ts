import { Router } from "express";
import { LogOutController } from "../controller/logOutController";

const logOutRouter = Router();
logOutRouter.post("/logout",LogOutController)

export default logOutRouter;