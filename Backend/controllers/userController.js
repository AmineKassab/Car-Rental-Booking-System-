import User from "../models/User.js";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import {BadRequestError,UnauthenticatedError} from "../errors/index.js"

const registerUser=async(req,res)=>{
    const user=await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user,token});

}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password ){
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const match=await user.matchPassword(password)
    if(!match){
        throw new UnauthenticatedError('Invalid Password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

const getProfile= async (req, res) => {
  res.json(req.user);
};

export {registerUser,loginUser,getProfile};