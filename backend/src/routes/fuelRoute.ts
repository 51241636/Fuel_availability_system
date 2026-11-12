import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { roleAuthenticate } from "../middlewares/rolebaseAuthetication";
import { UpdateFuelDetails } from "../controller/fuelController";




const fuelRouter = Router();
fuelRouter.patch("/updateFuelDetails/:stationId",authenticate,roleAuthenticate("admin","owner"),UpdateFuelDetails)
export default fuelRouter;