import { UnauthenticatedError } from "../errors/index.js"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const auth=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid') 
    }
    const token =authHeader.split(' ')[1];
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        const user =await User.findById(payload.userId).select("name email role")
        req.user={userId:payload.userId,name:payload.name,role:user.role}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid') 
    }



}

const admin=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next()
    }else{
        throw new UnauthenticatedError("Access denied: Admin only")
    }
}

export {auth,admin} ;