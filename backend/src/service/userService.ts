
import { UserDTO } from "../DTO/userDTO";
import { statusManage } from "../enums/statusManage";
import IUser from "../interface/userInterface";
import user from "../Repository/user";
const { MongoClient, ObjectId } = require('mongodb');



// updated saved user detail service function
export const updateUserSerivice=async(userDTO:UserDTO|null)=>{
     if(userDTO === null){
        throw new Error("User details not entered");
     }
      if (!userDTO.id) {
        throw new Error("User ID is required");
    }

     const findUser=await user.findById(userDTO.id);
     if(!findUser){
         throw new Error("User not found");
     }
          const userData : IUser ={
                name:userDTO.name,email:userDTO.email,address:userDTO.address,contact:userDTO.contact,password:userDTO.password,userRole:userDTO.userRole,userStatus:statusManage.ACTIVE
        }
    findUser.name=userData.name;
    findUser.email=userData.email;
    findUser.address=userData.address;
    findUser.contact=userData.contact;
    findUser.password=userData.password;
    findUser.userRole=userData.userRole;
    findUser.userStatus=userData.userStatus;
    return await findUser.save();

}

export const deleteUserService= async(userId:string)=>{
    if (!userId) {
        throw new Error("User ID is required");
    }
    const findUser=await user.findById(userId);
  

    if(!findUser){
         throw new Error("User not found");
     }

    findUser.userStatus=statusManage.INACTIVE;
    return await findUser.save();



}

export const getAllUsersService=async()=>{
  const allUsers=user.find({});
  if(!allUsers){
    throw new Error("not add Users");
  }
  return allUsers;
}