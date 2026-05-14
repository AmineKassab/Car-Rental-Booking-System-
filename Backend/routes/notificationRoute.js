import express from "express";
import {listAllNotifications,addNotification,updateNotification,deleteNotification} from '../controllers/notificationController.js';
import { admin,auth } from "../middleware/authentication.js";


const notificationRouter=express.Router();


notificationRouter.get('/notifications',auth,listAllNotifications)
notificationRouter.post('/notifications',auth,addNotification)
notificationRouter.patch('/notifications/:id',auth,updateNotification)
notificationRouter.delete('/notifications/:id',auth,deleteNotification)

export default notificationRouter;