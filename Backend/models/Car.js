import mongoose from "mongoose";

const carSchema=mongoose.Schema({
    brand:{type:String,required:true},
    model:{type:String,required:true},
    year:Number,
    pricePerDay:Number,
    
    transmission: { type: String, enum: ["manual", "automatic"],required: true  },
    fuelType: { type: String, enum: ["petrol", "diesel", "electric"],required: true  },
    seats: { type: Number, required: true },
    available: { type: Boolean, default: true },
    type: { 
        type: String, 
        enum: ["city car", "convertible", "SUV", "sedan", "pickup", "minivan"] , 
        required: true 
    },
    image:{
        type:Array,
        required:true
    },

    extraKilometerPrice: {
      type: Number,
      default: 0, 
    },
    unlimitedKilometerPrice: {
      type: Number,
      default: 0, 
    },
    taxes: {
      type: Number,
      default: 0, 
    },
    intermediateProtectionPrice: {
      type: Number,
      default: 0,
    },
    fullProtectionPrice: {
      type: Number,
      default: 0, 
    },
    options: [
        {
        name: {
            type: String,
            enum: [
            "driver",                          // Conducteur
            "fuel_service",                    // Service de plein/recharge
            "full_tank_pickup_empty_return",   // Véhicule pris réservoir plein - retour à vide
            "unlimited_express_toll",          // Péage express illimité
            "mobility_guarantee",              // Garantie mobilité
            "tire_glass_protection",           // Protection pneus et vitres
            "occupant_accident_protection",    // Protection occupant accident
            "interior_protection",             // Protection intérieure
            "baby_seat_0_18kg",                // Siège bébé (0-18kg / Groupe 0+/1)
            "child_seat_9_18kg",               // Siège enfant (9-18kg / Groupe 1)
            "booster_seat"                     // Rehausseur garanti
            ],
            required: true
        },
        price: { type: Number, required: true }
        }
    ]
},{timestamps:true})

const carModel=mongoose.models.Car || mongoose.model('Car',carSchema)

export default carModel ;

/**
 * {
  "brand": "Peugeot",
  "model": "308",
  "year": 2022,
  "pricePerDay": 4500,
  "transmission": "manual",
  "fuelType": "diesel",
  "seats": 5,
  "available": true,
  "type": "city car",
  "image": ["img1.jpg", "img2.jpg"],
  "extraKilometerPrice": 60,
  "unlimitedKilometerPrice": 1600,
  "taxes": 400,
  "intermediateProtectionPrice": 600,
  "fullProtectionPrice": 1200,
  "driverPrice": 900,
  "options": [
    { "name": "driver", "price": 900 },
    { "name": "fuel_service", "price": 300 },
    { "name": "full_tank_pickup_empty_return", "price": 500 },
    { "name": "unlimited_express_toll", "price": 800 },
    { "name": "mobility_guarantee", "price": 250 },
    { "name": "tire_glass_protection", "price": 400 },
    { "name": "occupant_accident_protection", "price": 600 },
    { "name": "interior_protection", "price": 350 },
    { "name": "baby_seat_0_18kg", "price": 200 },
    { "name": "child_seat_9_18kg", "price": 250 },
    { "name": "booster_seat", "price": 150 }
  ]
}

 */