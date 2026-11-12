import { Fuel } from "../interface/fuelStationInterface";
import fuelStation from "../Repository/fuelStation";

export const UpdateFuelDetailsService=async(stationId : string,fuelDetail: Fuel)=>{
    if(!stationId){
         throw new Error("fuel station Id not found")
    }
    if(!fuelDetail){
        throw new Error("fuel details not found")
    }

    const updateFuelDetails=await fuelStation.findByIdAndUpdate(stationId,{
        $set:{
            fuels:fuelDetail
        }
    },{
        new:true,
        runVaidators:true
    })

     if (!updateFuelDetails) {
        throw new Error("Station not found");
    }

    return updateFuelDetails;

}