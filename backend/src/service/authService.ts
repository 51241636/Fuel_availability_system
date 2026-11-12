
import { AuthDTO } from "../DTO/authDTO";
import { UserDTO } from "../DTO/userDTO";
import { statusManage } from "../enums/statusManage";
import IUser from "../interface/userInterface";
import user from "../Repository/user";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, JwtPayload } from "../util/jwtToken";

export const loginService=async(authDTO:AuthDTO)=>{
 try{
     if (!authDTO.username?.trim()|| !authDTO.password?.trim()) {
        throw new Error("username and password required")
    }
        const loginUserDetails=await user.findOne({userName:authDTO.username,userRole:authDTO.role});

        await console.log("login user details : ",loginUserDetails);
        
         if (!loginUserDetails || loginUserDetails.userRole !== authDTO.role) {
            console.log("User not found or role does not match");
            throw new Error("User not found or password is incorrect");
}
          const isMatch = await bcrypt.compare(authDTO.password, loginUserDetails.password);

           if (!isMatch) {
              throw new Error("password is invalid cant login ")
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
  const saltRound=Number(process.env.SALTROUND);
  if(!saltRound){
    throw new Error("password cant hashed salt round is null because cant save user")
  }
  const hashedPassword=await bcrypt.hash(userDTO.password,saltRound);
    let userData: IUser;
  if(userDTO.userRole =="owner"){
      userData={
                firstName:userDTO.firstName,userName:userDTO.userName,email:userDTO.email,address:userDTO.address,contact:userDTO.contact,password:hashedPassword,userRole:userDTO.userRole,paymentStatus:"PENDING",userStatus:statusManage.ACTIVE
        }
  }else{
     userData ={
                firstName:userDTO.firstName,userName:userDTO.userName,email:userDTO.email,address:userDTO.address,contact:userDTO.contact,password:hashedPassword,userRole:userDTO.userRole,paymentStatus:"NO PAYMENT",userStatus:statusManage.ACTIVE
        }
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