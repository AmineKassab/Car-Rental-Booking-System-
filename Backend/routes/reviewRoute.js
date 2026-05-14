import express from "express";
import {getAllReviews,listAllReviewsForCar,getReviews,deleteReview,addReview,myReviews} from '../controllers/reviewsController.js';
import { admin,auth } from "../middleware/authentication.js";


const reviewRouter=express.Router();

reviewRouter.get('/reviews/me',auth,myReviews)
reviewRouter.get('/reviews/car/:carId',listAllReviewsForCar)
reviewRouter.get('/reviews/service',getReviews)
reviewRouter.post('/reviews',auth,addReview)

reviewRouter.delete('/reviews/:id',auth,deleteReview)
reviewRouter.get('/reviews',auth,admin,getAllReviews)

export default reviewRouter;