import { Router } from "express";
import {changePassword, deleteUser, getAllUsers, updateUser} from "../controller/userController";
import { newAccessToken } from "../util/refreshToken";
import { authenticate } from "../middlewares/authMiddleware";
import { roleAuthenticate } from "../middlewares/rolebaseAuthetication";
import upload from "../middlewares/upload";
    

const router = Router();


router.put("/updateUser",upload.single("image"),authenticate,roleAuthenticate("customer","owner"), updateUser);
router.patch("/changeUserPasswrod",authenticate,roleAuthenticate("customer","owner"), changePassword);
router.delete("/getUser/:id",authenticate,roleAuthenticate("admin","owner"),deleteUser);
router.get("/getAllUsers",authenticate,getAllUsers)
router.post("/generateNewToken",newAccessToken);

export default router;