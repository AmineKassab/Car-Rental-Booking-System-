import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetType: {
      type: String,
      enum: ["car", "service"], 
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Car",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
      required:true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
