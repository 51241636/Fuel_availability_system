import { Types } from "mongoose";
import { FuelStationDTO } from "../DTO/fuelStationDTO";
import IStation from "../interface/fuelStationInterface";
import fuelStation from "../Repository/fuelStation";


export const saveNewStationService=async(fuelStationDTO:FuelStationDTO | null,userId:Types.ObjectId)=>{

     if (!fuelStationDTO) {
    throw new Error("Fuel station data not provided");
    }
    const stationData:IStation ={
        owner:userId,stationName:fuelStationDTO?.stationName,stationContact:fuelStationDTO?.stationContact,stationEmail:fuelStationDTO.stationEmail,stationAddress:fuelStationDTO.stationAddress,location:fuelStationDTO.location,fuels:fuelStationDTO.fuels,openTime:fuelStationDTO.openTime,closeTime:fuelStationDTO.closeTime,available:true
    }
    const savedStation = new fuelStation(stationData);
    await savedStation.save();
     if(!savedStation){
            throw new Error("station not registered successfully")
         }
         return savedStation;
    
}