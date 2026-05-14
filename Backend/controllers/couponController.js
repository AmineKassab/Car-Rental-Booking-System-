import couponModel from "../models/Coupon.js";
import NotFoundError from "../errors/not-found.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import addNotification from "../utils/notification.js";

const addCoupon=async(req,res)=>{
    const coupon=await couponModel.create({...req.body})
        await addNotification(
        null,
        `A new coupon "${coupon.code}" was created.`,
        "coupon",
        "admin"
    );
    res.status(StatusCodes.CREATED).json({success:true,coupon})  
}

const applyCoupon=async(req,res)=>{
    const {code,totalPrice}=req.body
    if(!code){
        throw new BadRequestError("Coupon code is required")
    } 
    if(!totalPrice){
        throw new BadRequestError("Total price is required to apply coupon")
    }  
    const coupon=await couponModel.findOne({code,active:true})
    if(!coupon){
        throw new NotFoundError("Invalid or inactive coupon code")
    } 
    if (coupon.expiryDate < new Date()) {
        throw new BadRequestError("This coupon has expired");
    }
    let discountApplied=0
    if(coupon.discountType==='percentage') {
         discountApplied= (Number(totalPrice) * coupon.discountValue) / 100;
    }else{
        discountApplied=coupon.discountValue
    }
    const discountedPrice=Math.max((Number(totalPrice)-discountApplied),0)
    await addNotification(
        req.user?.userId || null,
        `You applied coupon "${coupon.code}" successfully.`,
        "coupon",
        "user"
    );
    res.status(StatusCodes.OK).json({success:true,originalPrice: Number(totalPrice),discountedPrice,discountedPrice,coupon:coupon.code})
}

const listAllCoupons=async(req,res)=>{
    let filters={}
    if(req.query.active){
        filters.active=req.query.active === "true"
    }
    if (req.query.valid === "true") {
    filters.expiryDate = { $gte: new Date() };
    }

    
    const coupons=await couponModel.find(filters).sort('expiryDate');
    res.status(StatusCodes.OK).json({success:true,count: coupons.length,coupons})
}

const updateCoupon = async (req, res) => {
    const { id } = req.params; 
    const updates = req.body; 

    const coupon = await couponModel.findByIdAndUpdate(id, updates, {
        new: true,              
        runValidators: true     
    });

    if (!coupon) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: "Coupon not found" });
    }

    await addNotification(
        null,
        `Coupon "${coupon.code}" was updated.`,
        "coupon",
        "admin"
    );

    res.status(StatusCodes.OK).json({ success: true, coupon });
};


const deleteCoupon=async(req,res)=>{
    const {id}=req.params
    const coupon = await couponModel.findByIdAndDelete(id)
    if(!coupon){
        throw new NotFoundError(`No coupon with id ${id}`);
    }
    await addNotification(
        null,
        `Coupon "${coupon.code}" was deleted.`,
        "coupon",
        "admin"
    );
    res.status(StatusCodes.OK).json({success:true,coupon})    
}

const getCoupon=async(req,res)=>{
    const {id}=req.params;
    const coupon=await couponModel.findById(id)
    if(!coupon){
        throw new NotFoundError(`No coupon with id ${id}`)
    }
    res.status(StatusCodes.OK).json({success:true,coupon})
}


export {listAllCoupons,getCoupon,deleteCoupon,updateCoupon,addCoupon,applyCoupon} ;