import express from "express";
import {listAllCars,getCar,deleteCar,updateCar,addCar} from '../controllers/carController.js'
import upload from "../middleware/multer.js";
import { admin,auth } from "../middleware/authentication.js";

const carRouter=express.Router();

carRouter.get('/cars',listAllCars)
carRouter.get('/cars/:id',getCar)
carRouter.post('/cars',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),auth,admin,addCar)
carRouter.patch('/cars/:id',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),auth,admin,updateCar)
carRouter.delete('/cars/:id',auth,admin,deleteCar)

export default carRouter;