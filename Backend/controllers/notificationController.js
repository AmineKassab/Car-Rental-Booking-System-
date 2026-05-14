import notificationModel from "../models/Notification.js";
import NotFoundError from "../errors/not-found.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";


const listAllNotifications=async(req,res)=>{
    const {role,userId}=req.user
    let query = {};

    if (role === "admin") {
        query.ntfFor = "admin";
    } else {
        query.ntfFor = "user";
        query.user = userId; 
    }

    const notifications=await notificationModel.find(query).sort({createdAt:-1});
    res.status(StatusCodes.OK).json({success:true,notifications})
    
}

const addNotification=async(req,res)=>{
   const {userId}=req.user
   const {message,type,ntfFor} = req.body;
   let notificationData={
        
        message,
        type,
        ntfFor
   }
   if (ntfFor === "user") {
        notificationData.user = userId;
   }
   const notification=await notificationModel.create(notificationData)
   res.status(StatusCodes.CREATED).json({success:true,notification})

}

const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { role, userId } = req.user;

  
  let query = { _id: id };

  if (role === "admin") {
    query.ntfFor = "admin";
  } else {
    query.ntfFor = "user";
    query.user = userId;
  }

  const notification = await notificationModel.findOneAndUpdate(
    query,
    { read: true },
    { new: true, runValidators: true }
  );

  if (!notification) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: `Notification ${id} not found` });
  }

  res.status(StatusCodes.OK).json({ success: true, notification });
};


const deleteNotification=async(req,res)=>{
    const {id}=req.params
    const notification = await notificationModel.findByIdAndDelete(id)
    if(!notification){
        throw new NotFoundError(`No notification with id ${id}`);
    }
    res.status(StatusCodes.OK).json({success:true,notification})      
}



export {listAllNotifications,addNotification,updateNotification,deleteNotification} 