import mongoose from "mongoose";
import validator from 'validator'

const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    departurePlace: { type: String, required: true },   
    arrivalPlace: { type: String, required: true }, 
    quotient: { type: Number }, 
    totalPrice: { type: Number, required: true },
    finalPrice: { type: Number },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    couponCode:String,
    options:{type:Array},
    mileage: { //kilometrage
      type: {
        type: String,
        enum: ["limited", "unlimited"],
        required: true
      },
      price: { type: Number, default:0 }
    },
    identityDocument: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },
    options: [
      {
        name: { type: String, required: true }, 
        price: { type: Number, required: true }
      }
    ],

    priceBreakdown: {
      base: { type: Number, default: 0 },
      options: { type: Number, default: 0 },
      taxes: { type: Number, default: 0 },
      protection:{type:Number,default:0}
    },
    protection : {type:String,default:"basic"},
    rentalDays: { type: Number },
    paymentMethod:{type:String , enum: [ "cash", "stripe"], default: "cash" },
    email:{
        type:String,
        minlength:3,
        maxlength:50,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ]
        
    },
    name:{type:String},
    phone:{
      type:String,
      validate: {
        validator: (v) => validator.isMobilePhone(v, "any"), // "any" supports all locales
        message: (props) => `${props.value} is not a valid phone number`
      }}
  },
  { timestamps: true }
);

const reservationModel =
  mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

export default reservationModel;


/** 
 * {
  "protection": "intermediate",
  "options": ["driver", "fuel_service"],
  "paymentMethod": "stripe",
  "mileage": "unlimited",
  "user": "66d9f9f8f9e3a5c8d1f12345",
  "car": "66d9fa12a1c9b5c8d1f67890",
  "startDate": "2025-09-10:12:30",
  "endDate": "2025-09-15:12:30",
  "departurePlace": "Algiers",
  "arrivalPlace": "Oran",
  "status": "pending",
  "email": "testuser@example.com",
  "name": "John Doe",
  "phone": "+213555123456",
  "couponCode": "SAVE20",
  "identityPhoto:file"
}

 */
