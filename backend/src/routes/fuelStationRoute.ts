import { Router } from "express";
import { getAllStation, getUserStationDetails, registerStation, updateFillingDetail } from "../controller/stationCOntroller";
import { authenticate } from "../middlewares/authMiddleware";
import { roleAuthenticate } from "../middlewares/rolebaseAuthetication";


const stationRouter = Router();
stationRouter.post("/saveFuelStation",authenticate,roleAuthenticate("admin","owner"),registerStation);
stationRouter.get("/getUserFilligStation",authenticate,roleAuthenticate("admin","owner"),getUserStationDetails);
stationRouter.post("/updateStationDetail",authenticate,roleAuthenticate("admin","owner"),updateFillingDetail)
stationRouter.get("/getAllStations",authenticate,roleAuthenticate("admin","owner","customer"),getAllStation)

export default stationRouter;