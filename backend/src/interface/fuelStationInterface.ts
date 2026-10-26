import { Types } from "mongoose";




export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Fuel {
  fuelType: string;
  available: boolean;
  tankCapacity: number;
  currentStock:number;
  fuelPrice:number
}


export default interface IStation {
    _id?: Types.ObjectId;
    owner:Types.ObjectId;
    stationName: string;
    stationContact: string;
    stationEmail:string;
    stationAddress:string;
    location:Location;
    fuels:Fuel[]
    openTime: String;
    closeTime:String;
    available:boolean
}