
import { AuthDTO } from "../DTO/authDTO";
import { UserDTO } from "../DTO/userDTO";
import { statusManage } from "../enums/statusManage";
import IUser from "../interface/userInterface";
import user from "../Repository/user";
import { generateAccessToken, generateRefreshToken, JwtPayload } from "../util/jwtToken";

export const loginService=async(authDTO:AuthDTO)=>{
 try{
      console.log("wait01 : ", authDTO.username)
     if (!authDTO.username?.trim()|| !authDTO.password?.trim()) {
      console.log("wait02 : ", authDTO.username)
        throw new Error("username and password reqired")
    }
    await console.log("loginDetails :",authDTO.username)
        const loginUserDetails=await user.findOne({name:authDTO.username,userRole:authDTO.role});
        
         if (!loginUserDetails || loginUserDetails.userRole !== authDTO.role) {
            console.log("User not found or role does not match");
            throw new Error("User not found or password is incorrect");
}
        const payload:JwtPayload={
            userId:loginUserDetails?._id.toString(),
            userRole:loginUserDetails.userRole
        }

        const accessToken=await generateAccessToken(payload);
        const refreshToken=await generateRefreshToken(payload);
        return {
                accessToken,refreshToken,loginUserDetails
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

export const getMyDetailsService=(userId:string)=>{
  if(!userId){
    throw new Error("cant load user id not pass valid user id")
  }
  const myDetails=user.findById(userId);

  if(!myDetails){
    throw new Error("details not found")
  }

  return myDetails;
}