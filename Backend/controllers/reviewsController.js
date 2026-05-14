import Review from "../models/Review.js";
import NotFoundError from "../errors/not-found.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";


const getAllReviews=async(req,res)=>{
    const reviews=await Review.find({}).sort({createdAt:-1});
    res.status(StatusCodes.OK).json({success:true,reviews})
}

const listAllReviewsForCar=async(req,res)=>{
    const {carId}=req.params
    const reviews=await Review.find({targetType:'car',targetId:carId}).sort({createdAt:-1})
    res.status(StatusCodes.OK).json({success:true,reviews})
}

const getReviews=async(req,res)=>{
     const reviews=await Review.find({targetType:'service'}).sort({createdAt:-1});
     res.status(StatusCodes.OK).json({success:true,reviews})  
}

const deleteReview=async(req,res)=>{
    const {id}=req.params;
    const review=await Review.findByIdAndDelete(id)
    if(!review){
        throw new NotFoundError(`No review with id ${id}`);
    }
    
    res.status(StatusCodes.OK).json({success:true,review})    
}



const addReview=async(req,res)=>{
    const {userId}=req.user
    const {targetType,targetId,rating,title,comment}=req.body
    if(targetType==='car' && !targetId){
        throw new BadRequestError('Car ID is required to leave a review.')
    }  
    let reviewData={
        user:userId,
        targetType,
        targetId,
        rating,
        title,
        comment
    }
    const review = await Review.create(reviewData)
    res.status(StatusCodes.CREATED).json({success:true,review})
}

const myReviews=async(req,res)=>{
    const {userId}=req.user
    const reviews=await Review.find({user:userId}).sort({createdAt:-1})
    res.status(StatusCodes.OK).json({success:true,count: reviews.length,reviews})     
}



export {getAllReviews,listAllReviewsForCar,getReviews,deleteReview,addReview,myReviews};