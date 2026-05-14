import express from "express";
import {listAllCoupons,getCoupon,deleteCoupon,updateCoupon,addCoupon,applyCoupon} from '../controllers/couponController.js';
import { admin,auth } from "../middleware/authentication.js";


const couponRouter=express.Router();

couponRouter.post('/coupons/apply',applyCoupon)
couponRouter.get('/coupons',auth,admin,listAllCoupons)
couponRouter.get('/coupons/:id',auth,admin,getCoupon)
couponRouter.post('/coupons',auth,admin,addCoupon)
couponRouter.patch('/coupons/:id',auth,admin,updateCoupon)
couponRouter.delete('/coupons/:id',auth,admin,deleteCoupon)

export default couponRouter;