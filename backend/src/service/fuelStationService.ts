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

export const getUserStationDetailsService=async(userId:Types.ObjectId)=>{
    if(!userId){
        throw new Error ("user is not found")
    }
    const stationDetails=await fuelStation.find({owner:userId});
    if(!stationDetails){
        throw new Error("user not yet regiterd the filling station")
    }
     return stationDetails;
}


export const updateUserStationDetails=async(fuelStationDTO : FuelStationDTO | null,userId:Types.ObjectId)=>{
    if(!fuelStationDTO){
        throw new Error("fuel station details not found")
    }
    const stationData:IStation ={
        owner:userId,stationName:fuelStationDTO?.stationName,stationContact:fuelStationDTO?.stationContact,stationEmail:fuelStationDTO.stationEmail,stationAddress:fuelStationDTO.stationAddress,location:fuelStationDTO.location,fuels:fuelStationDTO.fuels,openTime:fuelStationDTO.openTime,closeTime:fuelStationDTO.closeTime,available:true
    }

    const updateFillingDetail=await fuelStation.findByIdAndUpdate(fuelStationDTO.stationId,stationData,{
        new :true,//eturns the modified document rather than the original
        runValidators:true//ensure the update compiles with your mongoose scema rules
    })

    if(!updateFillingDetail){
        throw new Error("fuel station not updated successfully")
    }
    return updateFillingDetail;
}

export const GetAllStation=async()=>{
    try{
        const allStation=await fuelStation.find({})
        if(!allStation){
            throw new Error("registerd stations not found")
        }
        return allStation;
    }catch(error){
        throw error
    }
}