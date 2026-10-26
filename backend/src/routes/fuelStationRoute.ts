import { Router } from "express";
import { registerStation } from "../controller/stationCOntroller";
import { authenticate } from "../middlewares/authMiddleware";
import { roleAuthenticate } from "../middlewares/rolebaseAuthetication";


const stationRouter = Router();
stationRouter.post("/saveFuelStation",authenticate,roleAuthenticate("admin","owner"),registerStation);

export default stationRouter;