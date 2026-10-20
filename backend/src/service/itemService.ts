import item from "../models/item";



const saveItemService=async(itemSavedData:any)=>{
     const itemObj = new item({
                itemName:itemSavedData.itemName,
                quantity:itemSavedData.quantity,
                unitPrice:itemSavedData.unitPrice
            });
            return await itemObj.save();

}

export default  saveItemService;