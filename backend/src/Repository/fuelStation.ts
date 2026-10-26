import mongoose, { Schema } from "mongoose";
import IStation from "../interface/fuelStationInterface";

const stationSchema=new Schema<IStation>({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    stationName:{
        type:String,
        required:true
    },
    stationContact:{
          type: String,
    required: [true, 'Sri Lankan contact number is required'],
    trim: true,
    validate: {
      validator: function(value) {
        // 1. Strip out whitespaces, hyphens, and parentheses for a clean check
        const cleaned = value.replace(/[\s\-()]/g, '');
        
        // 2. Sri Lankan Pattern:
        // Domestic: ^0[0-9]{9}$ (e.g., 0771234567 or 0112345678)
        // International: ^(?:\+?94)[0-9]{9}$ (e.g., +94771234567 or 94771234567)
        const lkPhoneRegex = /^(?:0|(?:\+?94))[0-9]{9}$/;
        
        return lkPhoneRegex.test(cleaned);
      },
      message: props => `${props.value} is not a valid Sri Lankan phone number!`
  }
    },
    stationEmail:{
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
 
    },
    stationAddress:{
        type:String,
        required:true
    },
    location:{
        type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
     coordinates: {
      type: [Number],
      required: true,
    },
    },
    fuels:[
        {
            fuelType:{
                type:String,
                required:true
            },
             available: {
                type: Boolean,
                default: true,
            },
            tankCapacity:{
                type:Number,
                required:true,
                min:0
            },
            currentStock:{
                type:Number,
                required:true,
                min:0
            },
            fuelPrice:{
                type:Number,
                require:true,
                min:0
            },


        },
    ],
    openTime:{
      type:String,
      required:true
    },
    closeTime:{
        type:String,
        required:true
    }

});
stationSchema.index({ location: "2dsphere" });
const fuelStation=mongoose.model("Station",stationSchema)
export default fuelStation;