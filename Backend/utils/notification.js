import notificationModel from "../models/Notification.js";


const  addNotification = async (userId=null, message, type = "general",ntfFor="user") => {
  try {
    await notificationModel.create({
      user: userId ,
      message,
      type,
      ntfFor
    });
  } catch (error) {
    console.error("Erreur lors de la création de notification:", error.message);
  }
};

export default addNotification;
