import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, 
  discountType: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
  discountValue: { type: Number, required: true }, 
  expiryDate: { type: Date, required: true },
  active: { type: Boolean, default: true }
},{timestamps:true});

couponSchema.pre('save',function(next){
    if(this.expiryDate < new Date()){
        return next(new Error("Expiry date must be in the future"));
    }
    next()

})

export default mongoose.model("Coupon", couponSchema);
