
import { UserDTO } from "../DTO/userDTO";
import { statusManage } from "../enums/statusManage";
import IUser from "../interface/userInterface";
import user from "../Repository/user";
const { MongoClient, ObjectId } = require('mongodb');
import bcrypt from "bcrypt";



// updated saved user detail service function
export const updateUserSerivice=async(userDTO:UserDTO|null,imagePath:string | undefined)=>{
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
          const userData : Partial<IUser> ={
                name:userDTO.name,email:userDTO.email,address:userDTO.address,contact:userDTO.contact,image:imagePath,userStatus:statusManage.ACTIVE
        }

         const updateUserDetails=await user.findByIdAndUpdate(userDTO.id,userData,{
                new :true,//eturns the modified document rather than the original
                runValidators:true//ensure the update compiles with your mongoose scema rules
            })
        return updateUserDetails;

}

export const ChangePassword=async(userId:string,currentPassword:string,newPassword:string)=>{
    try{
         const userDetails = await user.findById(userId);
         if(!userDetails){
            throw new Error("User not found");
         }
          const isMatch = await bcrypt.compare( currentPassword,userDetails.password);

            if (!isMatch) {
            throw new Error("Current password is incorrect");
            }

             const saltRound=Number(process.env.SALTROUND);
             if(!saltRound){
         throw new Error("password cant hashed salt round is null because cant save user")
       }
       const hashedPassword=await bcrypt.hash(newPassword,saltRound);
       userDetails.password = hashedPassword;

        await userDetails.save();

        return "Password updated successfully";

    }catch(error){
        throw error;
    }
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