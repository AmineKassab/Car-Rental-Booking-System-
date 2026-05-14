import express from "express";
import {listAllReservations,getReservation,myReservations,cancelReservation,addReservation,updateReservation,deleteReservation} from '../controllers/reservationController.js'
import upload from "../middleware/multer.js";
import { admin,auth } from "../middleware/authentication.js";

const reservationRouter=express.Router();

reservationRouter.get('/reservations',auth,admin,listAllReservations)
reservationRouter.get('/reservations/:id',auth,admin,getReservation)
reservationRouter.patch('/reservations/:id',upload.single('identityPhoto'),  updateReservation);
reservationRouter.delete('/reservations/:id', auth, admin, deleteReservation);

reservationRouter.get('/my-reservations',auth,myReservations)
reservationRouter.post('/reservations',upload.single('identityPhoto'),addReservation)
reservationRouter.patch('/reservations/:id/cancel',cancelReservation)


export default reservationRouter;