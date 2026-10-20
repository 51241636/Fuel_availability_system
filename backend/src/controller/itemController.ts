import { Request, Response } from "express";
import saveItemService from "../service/itemService";+

const saveItem = async (req: Request, res: Response) => {
    try {
        const { itemName, quantity, unitPrice } = req.body;

         const itemData = {
            itemName,
            quantity,
            unitPrice
        };

        const savedItem=await saveItemService(itemData);

        res.status(200).json({
            message: "Item saved successfully",
            item: savedItem
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to save item",
            error: error
        });
    }
};


// const getItemById=async()=>{

// }

export default saveItem;