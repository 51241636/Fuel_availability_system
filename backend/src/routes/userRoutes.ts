import { Router } from "express";
import {deleteUser, getAllUsers, updateUser} from "../controller/userController";
import { newAccessToken } from "../util/refreshToken";
import { authenticate } from "../middlewares/authMiddleware";
    

const router = Router();


router.put("/updateUser",authenticate, updateUser);
router.delete("/getUser/:id",authenticate,deleteUser);
router.get("/getAllUsers",authenticate,getAllUsers)
router.post("/generateNewToken",newAccessToken);

export default router;