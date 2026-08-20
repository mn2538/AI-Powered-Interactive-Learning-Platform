import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail } from "../models/user.ts";

interface User {
  id: number,
  name: string,
  email: string
}

interface LoginResponse {
    success : boolean,
    token: string,
    user : User
}

interface RegisterResponse {
  success: Boolean,
  user: User
}

export const login = async(email: string, password: string) : Promise<LoginResponse> => {
  const user = await findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({
    id: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET as string, {
    expiresIn : '1h',
  }
)
return {
    success : true,
    token: token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    }
}
}

export const register = async(name: string, email: string, password: string) : Promise<RegisterResponse> => {
  const user = await findByEmail(email);
  if(user){
    throw new Error("User Already Exists");
  }
  

}