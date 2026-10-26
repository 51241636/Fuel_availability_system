import { Request, Response } from "express";
import { FuelStationDTO } from "../DTO/fuelStationDTO";
import { saveNewStationService } from "../service/fuelStationService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const registerStation=async (req:AuthRequest,res:Response)=>{
  
        try{
            const fuelStationDTO:FuelStationDTO=req.body;
            // console.log(fuelStationDTO)
        const saved= await saveNewStationService(fuelStationDTO,req.userId);
        console.log("saved station succesfully",saved)
        res.status(200).json({
            message:"fuelStation Registered successfully",
            user:saved
        });

        }catch(error){
             console.log(error)
            const message=error instanceof Error ? error.message : "something went wrong"
            const status =404
            return res.status(status).json({
                 success:false,
                 message
            })
        }
   
}
