import express from "express";
import {numberOfUsers,numberOfActiveUsers,numberOfCars,numberOfCoupons,numberOfReservations,numberOfReservationsByStatus,numberOfUserLastPeriod,numberOfReviews,carAvailable,mostReservedCars,revenueLastPeriod,topUsers,topCoupons,topCars,averageRating} from '../controllers/adminStateController.js';
import { admin,auth } from "../middleware/authentication.js";


const adminStateRouter=express.Router();

adminStateRouter.get('/admin/stats/users/total',auth,admin,numberOfUsers)
adminStateRouter.get('/admin/stats/users/new',auth,admin,numberOfUserLastPeriod) //?period=month => it's mean total of user last month
adminStateRouter.get('/admin/stats/users/active',auth,admin,numberOfActiveUsers)
adminStateRouter.get('/admin/stats/cars/total',auth,admin,numberOfCars)
adminStateRouter.get('/admin/stats/cars/available',auth,admin,carAvailable)
adminStateRouter.get('/admin/stats/cars/top',auth,admin,mostReservedCars)
adminStateRouter.get('/admin/stats/reservations/total',auth,admin,numberOfReservations)
adminStateRouter.get('/admin/stats/reservations/by-status',auth,admin,numberOfReservationsByStatus)
adminStateRouter.get('/admin/stats/reservations/revenue',auth,admin,revenueLastPeriod)//?period=month => it's mean total of revenue last month
adminStateRouter.get('/admin/stats/reservations/top-users',auth,admin,topUsers)
adminStateRouter.get('/admin/stats/coupons/used',auth,admin,numberOfCoupons)
adminStateRouter.get('/admin/stats/coupons/top',auth,admin,topCoupons)
adminStateRouter.get('/admin/stats/reviews/total',auth,admin,numberOfReviews)
adminStateRouter.get('/admin/stats/reviews/average-rating',auth,admin,averageRating)
adminStateRouter.get('/admin/stats/reviews/top-cars',auth,admin,topCars)

export default adminStateRouter;