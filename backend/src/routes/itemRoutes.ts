import { Router } from "express";
import {saveItem,getItemById} from "../controller/itemController";
    

const router = Router();

router.post("/items", saveItem);
router.get("/items/:id", getItemById);

export default router;