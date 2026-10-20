
import { AuthDTO } from "../DTO/authDTO";
import { UserDTO } from "../DTO/userDTO";
import { statusManage } from "../enums/statusManage";
import IUser from "../interface/userInterface";
import user from "../models/user";
import { generateAccessToken, generateRefreshToken, JwtPayload } from "../util/jwtToken";

export const loginService=async(authDTO:AuthDTO)=>{
 try{
     if (!authDTO.userName?.trim()|| !authDTO.password?.trim()) {
        throw new Error("username and password reqired")
    }
        const loginUserDetails=await user.findOne({name:authDTO.userName});
          if(!loginUserDetails){
            console.log("user not fountf")
            throw new Error("user not found or user password not correct")
  }
        const payload:JwtPayload={
            userId:loginUserDetails?._id.toString(),
            userRole:loginUserDetails.userRole
        }

        const accessToken=await generateAccessToken(payload);
        const refreshToken=await generateRefreshToken(payload);
        return {
                accessToken,refreshToken
        }
            
        
      

 }catch(error){
    throw new Error("username or password invalid")
 }
}

// saved new User within this function
export const saveUserService=async(userDTO:UserDTO|null)=>{
  if(userDTO === null){
    throw new Error("User details not entered");
  }
  const userData : IUser ={
                name:userDTO.name,email:userDTO.email,address:userDTO.address,contact:userDTO.contact,password:userDTO.password,userRole:userDTO.userRole,userStatus:statusManage.ACTIVE
        }
        if(!userData){
            throw new Error("user data not added correctly")
        }

        const saveUser=new user(userData);
         const savedUser=await saveUser.save()
         if(!savedUser){
            throw new Error("user not registered successfully")
         }
         return savedUser;

}