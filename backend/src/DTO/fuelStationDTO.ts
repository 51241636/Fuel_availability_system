import { Fuel, Location } from "../interface/fuelStationInterface";

export interface FuelStationDTO{
        stationId:string
        stationName: string;
        stationContact: string;
        stationEmail:string;
        stationAddress:string;
        location:Location;
        fuels:Fuel[]
        openTime: string;
        closeTime:string
        available:boolean
}