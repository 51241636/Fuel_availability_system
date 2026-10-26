import mongoose from "mongoose";



const itemSchema=new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true

    },
    unitPrice:{
        type:Number,
        required:true
    }
})
const item=mongoose.model("item",itemSchema);
export default item;