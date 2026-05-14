import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true,'Please provide Email'],
        minlength:3,
        maxlength:50,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        unique: true,
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
        
    },
    phone: {
        type: String,
        required: false,
        validate: {
            validator: (v) => validator.isMobilePhone(v, "any"), 
            message: (props) => `${props.value} is not a valid phone number`
        }
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
}, { timestamps: true });


userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()

})

userSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.matchPassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User ;