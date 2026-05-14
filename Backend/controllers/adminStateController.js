import couponModel from "../models/Coupon.js";
import NotFoundError from "../errors/not-found.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import User from "../models/User.js";
import reservationModel from "../models/Reservation.js";
import carModel from "../models/Car.js";
import Review from "../models/Review.js";


const numberOfUsers=async(req,res)=>{
    const totalUsers=await User.countDocuments()
    res.status(StatusCodes.OK).json({success:true,totalUsers})
}

const numberOfUserLastPeriod=async(req,res)=>{
    const {period}=req.query
    const Start=new Date()
    if(period==='month'){
        Start.setMonth(Start.getMonth() -1);
    }else if(period==='day') {
        Start.setDate(Start.getDate()-1)
    }else{
        Start.setFullYear(Start.getFullYear()-1)
    }
    
    const newUsersThisPeriod=await User.countDocuments({createdAt:{$gte :Start}})
    res.status(StatusCodes.OK).json({success:true,newUsersThisPeriod})
}

const numberOfReviews=async(req,res)=>{
    const totalReviews=await Review.countDocuments();
    res.status(StatusCodes.OK).json({success:true,totalReviews})    
}

const numberOfReservationsByStatus=async(req,res)=>{
    const pending=await reservationModel.countDocuments({status:"pending"})
    const confirmed=await reservationModel.countDocuments({status:"confirmed"})
    const cancelled=await reservationModel.countDocuments({status:"cancelled"})
    res.status(StatusCodes.OK).json({success:true,stats:{pending,confirmed,cancelled}})  

}

const numberOfReservations=async(req,res)=>{
    const totalReservations=await reservationModel.countDocuments();
    res.status(StatusCodes.OK).json({success:true,totalReservations})      
}

const numberOfCoupons=async(req,res)=>{
    const totalCoupons=await couponModel.countDocuments();
    res.status(StatusCodes.OK).json({success:true,totalCoupons})   
}

const numberOfCars=async(req,res)=>{
    const totalCars=await carModel.countDocuments();
    res.status(StatusCodes.OK).json({success:true,totalCars})  
}

const numberOfActiveUsers=async(req,res)=>{
    const activateSince = new Date()
    activateSince.setDate(activateSince.getDate() - 30)
    
    const usersByLogin=await User.find({lastLogin:{$gte:activateSince}}).distinct("_id")
    const usersbyReservation=await reservationModel.find({createdAt:{$gte:activateSince}}).distinct("user");

    const allActivateUsers=new Set([...usersByLogin.map(id=>id.toString()),...usersbyReservation.map(id=>id.toString())])
    res.status(StatusCodes.OK).json({success:true,activateUsers:allActivateUsers.size,byLogin:usersByLogin.length,byReservation:usersbyReservation.length})
}

const carAvailable=async(req,res)=>{
    const availableCars = await Car.countDocuments({ available: true });

    res.status(StatusCodes.OK).json({
      success: true,
      totalAvailableCars: availableCars }) 
}

const mostReservedCars=async(req,res)=>{
    const result=await reservationModel.aggregate([
        {$group :{_id:"$car",totalReservations: { $sum: 1 }}},
        {$sort:{totalReservations:-1}},
        {$limit:5}
    ])

    if (result.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No reservations yet." });
    }

    const cars=await carModel.find({
        _id:{$in:result.map((r)=>r._id)}
    }).select("brand model")

    const topReservedCar=result.map((r)=>{
        const car=cars.find((c)=>c._id.toString()===r._id.toString())
        return(
            {car,
            totalReservations: r.totalReservations,}
        )
    })

    res.status(StatusCodes.OK).json({success:true,mostReservedCars:topReservedCar})



}

const topCars=async(req,res)=>{
    const result=await Review.aggregate([
       { $match: { targetType: "car" } },
       {$group :{_id:"$targetId",averageRating:{$avg:"$rating"}}},
       {$sort:{averageRating:-1}},
       {$limit:5},
       {
            $lookup: {
                from: "cars", 
                localField: "_id",
                foreignField: "_id",
                as: "car"
            }
        },
        {
            $unwind: "$car"
        },
        {
            $project: {
                _id: 0,
                brand: "$car.brand",
                model: "$car.model",
                
                averageRating: 1
            }
        }
       

 
    ]) 
    res.status(StatusCodes.OK).json({success:true,topCars:result})     
}

const topCoupons=async(req,res)=>{
    const result=await reservationModel.aggregate([
        {$match:{coupon:{$ne:null}}},
        {$group:{_id:"$coupon",totalUsed:{$sum:1}}},
        {$sort:{totalUsed:-1}},
        {$limit:5},
        {
            $lookup: {
                from: "coupons", 
                localField: "_id",
                foreignField: "_id",
                as: "coupon"
            }
        },
        {
            $unwind: "$coupon"
        },
        {
            $project: {
                _id: 0,
                code: "$coupon.code",
                discountType: "$coupon.discountType",
                discountValue: "$coupon.discountValue",
                totalUsed: 1
            }
        }
    ])
    
    res.status(StatusCodes.OK).json({ success: true, topCoupons: result });
}

const topUsers=async(req,res)=>{
    const result=await reservationModel.aggregate([
        { $match: { user: { $ne: null } } },  
        {$group : {_id:"$user",totalReservation:{$sum:1}}},
        {$sort:{totalReservation:-1}},
        {$limit:5}
    ])  
    
    //const newResult=result.filter((r)=>{
    //    return(r._id != null)
    //})
    
    if (result.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No Users yet." });
    }

    const users=await User.find({
        _id:{$in:result.map((r)=>r._id)}
    }).select("name email")

    const bestUsers=result.map((r)=>{
        const user=users.find((c)=>c._id.toString()===r._id.toString())
        return(
            {user,
            totalReservation: r.totalReservation,}
        )
    })

    res.status(StatusCodes.OK).json({success:true,topUsers:bestUsers})


}

const revenueLastPeriod=async(req,res)=>{
    const {period}=req.query;
    const start=new Date()
    if(period==='month'){
        start.setMonth(start.getMonth() -1);
    }else if(period==='day') {
        start.setDate(start.getDate()-1)
    }else{
        start.setFullYear(start.getFullYear()-1)
    }

    const total=await reservationModel.aggregate([
        { $match: { createdAt: { $gte: start } } },
        {$group:{_id:null,revenue:{$sum:"$totalPrice"}}}
    ])

    const totalRevenue=total.length >0 ? total[0].revenue : 0
     

    res.status(StatusCodes.OK).json({success:true,totalRevenue})

}

const averageRating=async(req,res)=>{
    const result=await Review.aggregate([
        {$group:{_id:null,averageRating:{$avg:"$rating"}}}
    ]) 
    const avg = result.length > 0 ? result[0].averageRating : 0; 
    res.status(StatusCodes.OK).json({success:true,averageRating:avg})  
}



export {numberOfUsers,numberOfActiveUsers,numberOfCars,numberOfCoupons,numberOfReservations,numberOfReservationsByStatus,numberOfUserLastPeriod,numberOfReviews,carAvailable,mostReservedCars,revenueLastPeriod,topUsers,topCoupons,topCars,averageRating} 