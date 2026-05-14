import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
    message: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["reservation", "payment", "coupon", "message", "admin", "general","system"], 
      default: "general" 
    },
    ntfFor: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const notificationModel =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default notificationModel;
