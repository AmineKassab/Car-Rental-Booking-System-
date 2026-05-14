import reservationModel from "../models/Reservation.js";
import NotFoundError from "../errors/not-found.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import carModel from "../models/Car.js";
import {v2 as cloudinary} from "cloudinary"
import addNotification from "../utils/notification.js";
import Coupon from "../models/Coupon.js";


const listAllReservations=async(req,res)=>{
    const { status, user, car, startDate, endDate, page = 1, limit = 20 } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (user) filters.user = user;
    if (car) filters.car = car;

    if (startDate || endDate) {
        filters.$and = [];
        if (startDate) filters.$and.push({ startDate: { $gte: new Date(startDate) } });
        if (endDate) filters.$and.push({ endDate: { $lte: new Date(endDate) } });
    }

    const reservations=await reservationModel.find(filters).populate("user", "name email") 
    .populate("car", "brand model pricePerDay") 
    .sort({ createdAt: -1 }) // newest first
    .skip((page - 1) * limit)
    .limit(Number(limit));

    const total=await reservationModel.countDocuments(filters)

    res.status(StatusCodes.OK).json({
        success: true,
        reservations,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
    });

}

const getReservation=async(req,res)=>{
    const {id}=req.params
    const reservation=await reservationModel.findById(id)
    if(!reservation){
        throw new NotFoundError(`No reservation with id ${id}`)
    }
    res.status(StatusCodes.OK).json({success:true,reservation})   
}

const myReservations=async(req,res)=>{
    const {userId}=req.user;
    const myreservations=await reservationModel.find({user:userId}).populate("car", "brand model pricePerDay").sort({createdAt:-1})
    if(!myreservations || myreservations.length === 0){
        throw new NotFoundError(`No reservations with UserId ${userId}`)
    }
    res.status(StatusCodes.OK).json({success:true,myreservations})   


}

const cancelReservation=async(req,res)=>{
   const {id}=req.params 
   const reservation = await reservationModel.findByIdAndUpdate(id, {status:"cancelled"}, {
        new: true,              
        runValidators: true     
    });
   
    if (!reservation) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: "Reservation not found" });
    }
       await addNotification(req.user.userId, "Your reservation was cancelled!", "reservation", "user");
       res.status(StatusCodes.OK).json({ success: true, reservation });

}

const addReservation=async(req,res)=>{
    let {protection,options,paymentMethod,mileage,user,car,startDate,endDate,departurePlace,arrivalPlace,quotient,status,email,name,phone,couponCode}=req.body
    
    

    if(!user && (!email || !name ||!phone)){
        throw new BadRequestError("If not logged in, you must provide name and email and phone")
    }
    
    if (!req.file) {
        throw new BadRequestError("Identity document is required");
    }
    
    const identityPhoto=req.file   
    let result=await  cloudinary.uploader.upload(identityPhoto.path,{resource_type:'image'})
    const imageUrl=result.secure_url

    const caravailable=await carModel.findById(car);
    if (!caravailable) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: "Car not found",
        });
    }
    if(!caravailable.available){
        return res.status(StatusCodes.CONFLICT).json({success:false,msg:"This car is currently unavailable"})
    }


    const conflict = await reservationModel.findOne({
        car,
        $or: [
            { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
        ],
    });

    if (conflict) {
        return res
            .status(StatusCodes.CONFLICT)
            .json({ success: false, msg: "Car is already reserved in this period" });
        }

    const days=(new Date(endDate).getTime() - new Date(startDate))/(1000*60*60*24)
    let basePrice = days * caravailable.pricePerDay;

    if (typeof options === "string") {
        try {
            options = JSON.parse(options);
        } catch (e) {
            options = [];
        }
    }

  
    let optionsTotal = 0;
    let formattedOptions = [];
    if (Array.isArray(options) && options.length > 0) {
        formattedOptions = options.map((optName) => {
        const carOption = caravailable.options.find(o => o.name === optName);
        if (!carOption) {
            throw new BadRequestError(`Option ${optName} not available for this car`);
        }
        optionsTotal += Number(carOption.price);
        return {
            name: optName,
            price: Number(carOption.price),
        };
        });
    }

    let taxes = caravailable.taxes || 0;

    let totalPrice = basePrice + optionsTotal + taxes;
    let newmileage = {};

    if (mileage === "unlimited") {
    
        const unlimitedKilometerPrice = Number(caravailable.unlimitedKilometerPrice) || 0;
        totalPrice += unlimitedKilometerPrice * days;
        newmileage = { type: "unlimited", price: unlimitedKilometerPrice };
    } else if (mileage === "limited") {
    
        const extraKilometerPrice =Number(caravailable.extraKilometerPrice) || 0;
        newmileage = { type: "limited", price: extraKilometerPrice };
    } else {
        throw new BadRequestError("Mileage must be either 'limited' or 'unlimited'");
    }

    let protectionPrice = 0;
    let protectionType = "basic"; 

    if (protection === "intermediate") {
    protectionPrice = (caravailable.intermediateProtectionPrice || 0) * days;
    quotient = 0; 
    protectionType = "intermediate";
    } else if (protection === "full") {
    protectionPrice = (caravailable.fullProtectionPrice || 0) * days;
    quotient = 0; 
    protectionType = "full";
    } else {
    
    protectionType = "basic";
    }

    totalPrice += protectionPrice;



    let finalPrice=totalPrice;
    let coupon=null
    let discountApplied=0;

    if(couponCode){
        coupon=await Coupon.findOne({code:couponCode,active:true})
        if(!coupon){
            throw new NotFoundError("Invalid or inactive coupon code")
        } 
        if (coupon.expiryDate < new Date()) {
            throw new BadRequestError("This coupon has expired");
        }
        
        if(coupon && coupon.expiryDate > new Date()){
            
            if(coupon.discountType==='percentage') {
                discountApplied= (Number(totalPrice) * coupon.discountValue) / 100;
            }else{
                discountApplied=coupon.discountValue
            }
        }
        finalPrice=Math.max((Number(totalPrice)-discountApplied),0)
    }
    

    let reservationData={
        user,
        car,
        startDate,
        endDate,
        totalPrice,
        finalPrice,
        discountApplied,
        coupon: coupon?._id || null,
        departurePlace,
        arrivalPlace,
        quotient: quotient ?? (protectionType === "basic" ? 50000 : 0),
        rentalDays: days,
        options: formattedOptions,
        priceBreakdown: {
            base: basePrice,
            options: optionsTotal,
            taxes,
            protection: protectionPrice
        },
        protection: protectionType,
        paymentMethod,
        mileage:newmileage,
        status,
        email,name,phone,
        identityDocument:imageUrl
    }

    const reservation = await reservationModel.create(reservationData);
    if (req.user) {
        await addNotification(
        req.user.userId,
        `Your reservation for ${caravailable.brand} ${caravailable.model} was created!`,
        "reservation",
        "user"
        );
    }

    await addNotification(
        null,
        `New reservation created by ${req.user ? req.user.name : name} for ${caravailable.brand} ${caravailable.model}`,
        "reservation",
        "admin"
    );

    res.json({success:true,message:"Reservation Added!",reservation})




}

const updateReservation = async (req, res) => {
    const { id } = req.params;

    
    const reservationToUpdate = await reservationModel.findById(id);
    if (!reservationToUpdate) {
        throw new NotFoundError(`No reservation with id ${id}`);
    }

    
    let updates = { ...req.body };

    
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        });
        updates.identityDocument = result.secure_url;
    }

    
    let caravailable = "";
    if (updates.car) {
        caravailable = await carModel.findById(updates.car);
        if (!caravailable) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ success: false, msg: "Car not found" });
        }
        if (!caravailable.available) {
        return res
            .status(StatusCodes.CONFLICT)
            .json({ success: false, msg: "This car is currently unavailable" });
        }
    } else {
        caravailable = await carModel.findById(reservationToUpdate.car);
    }

    
    const newStart = updates.startDate || reservationToUpdate.startDate;
    const newEnd = updates.endDate || reservationToUpdate.endDate;

    const conflict = await reservationModel.findOne({
        car: updates.car || reservationToUpdate.car,
        _id: { $ne: id },
        $or: [{ startDate: { $lte: newEnd }, endDate: { $gte: newStart } }],
    });

    if (conflict) {
        return res.status(StatusCodes.CONFLICT).json({
        success: false,
        msg: "Car is already reserved in this new period",
        });
    }

    const newCarId = updates.car || reservationToUpdate.car;
    const carafterUpdate = await carModel.findById(newCarId);

    const newdays =
        (new Date(newEnd).getTime() - new Date(newStart).getTime()) /
        (1000 * 60 * 60 * 24);

    
    let basePrice = newdays * carafterUpdate.pricePerDay;

    // ---------- OPTIONS ------------------------------
    let optionsTotal = 0;
    if (updates.options) {
        let options = updates.options;

        if (typeof options === "string") {
        try {
            options = JSON.parse(options);
        } catch (e) {
            options = [];
        }
        }

        let formattedOptions = [];
        if (Array.isArray(options) && options.length > 0) {
        formattedOptions = options.map((optName) => {
            const carOption = caravailable.options.find((o) => o.name === optName);
            if (!carOption) {
            throw new BadRequestError(
                `Option ${optName} not available for this car`
            );
            }
            optionsTotal += Number(carOption.price);
            return {
            name: optName,
            price: Number(carOption.price),
            };
        });
        }
        updates.options = formattedOptions;
    }

    // ---------- MILEAGE ----------------------------------
    if (updates.mileage) {
        let newmileage = {};
        if (updates.mileage === "unlimited") {
        const unlimitedPrice =
            Number(caravailable.unlimitedKilometerPrice) || 0;
        basePrice += unlimitedPrice * newdays;
        newmileage = { type: "unlimited", price: unlimitedPrice };
        } else if (updates.mileage === "limited") {
        const extraPrice = Number(caravailable.extraKilometerPrice) || 0;
        newmileage = { type: "limited", price: extraPrice };
        } else {
        throw new BadRequestError(
            "Mileage must be either 'limited' or 'unlimited'"
        );
        }
        updates.mileage = newmileage;
    }

    // ------- PROTECTION ---------------------------
    if (updates.protection) {
        let protectionPrice = 0;
        let protectionType = "basic";

        if (updates.protection === "intermediate") {
        protectionPrice =
            (caravailable.intermediateProtectionPrice || 0) * newdays;
        protectionType = "intermediate";
        } else if (updates.protection === "full") {
        protectionPrice =
            (caravailable.fullProtectionPrice || 0) * newdays;
        protectionType = "full";
        }

        updates.protection = protectionType;
        updates.priceBreakdown = updates.priceBreakdown || {};
        updates.priceBreakdown.protection = protectionPrice;

        basePrice += protectionPrice;
    }

    // ---------- TAXES ----------
    let taxes = caravailable.taxes || 0;

    // ---------- TOTAL PRICE ----------
    let totalPrice = basePrice + optionsTotal + taxes;

    // ---------- COUPON ----------
    let finalPrice = totalPrice;
    let coupon = null;
    let discountApplied = 0;

    if (updates.couponCode) {
        coupon = await Coupon.findOne({
        code: updates.couponCode,
        active: true,
        });
        if (!coupon) {
        throw new NotFoundError("Invalid or inactive coupon code");
        }
        if (coupon.expiryDate < new Date()) {
        throw new BadRequestError("This coupon has expired");
        }

        if (coupon.discountType === "percentage") {
        discountApplied = (Number(totalPrice) * coupon.discountValue) / 100;
        } else {
        discountApplied = coupon.discountValue;
        }

        finalPrice = Math.max(Number(totalPrice) - discountApplied, 0);
    }

    updates.totalPrice = totalPrice;
    updates.finalPrice = finalPrice;
    updates.discountApplied = discountApplied;
    updates.coupon = coupon ? coupon._id : reservationToUpdate.coupon;
    updates.couponCode =
        updates.couponCode || reservationToUpdate.couponCode;

    
    const resr = await reservationModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });

    if (!resr) {
        throw new NotFoundError(`No reservation with id ${id}`);
    }

    
    await addNotification(
        req.user.userId,
        `Your reservation for ${carafterUpdate.brand} ${carafterUpdate.model} was updated.`,
        "reservation",
        "user"
    );

    res.status(StatusCodes.OK).json({ success: true, resr });
};



const deleteReservation=async(req,res)=>{
    const {id}=req.params 
    const reservation=await reservationModel.findById(id).populate("car")
    if(!reservation){
        throw new NotFoundError(`No reservation with id ${id}`)
    }
    await addNotification(
    req.user.userId,
    `Your reservation for ${reservation.car.brand} ${reservation.car.model} was cancelled.`,
    "reservation",
    "user"
    );
    res.status(StatusCodes.OK).json({success:true,reservation})
    
}


export {listAllReservations,getReservation,myReservations,cancelReservation,addReservation,updateReservation,deleteReservation};