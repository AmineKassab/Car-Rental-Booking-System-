import {v2 as cloudinary} from "cloudinary"
import carModel from "../models/Car.js";
import NotFoundError from "../errors/not-found.js";
import { StatusCodes } from "http-status-codes";
import addNotification from "../utils/notification.js";
import { json } from "express";


const listAllCars=async(req,res)=>{
    const filters={}
    if(req.query.brand){
        filters.brand=req.query.brand
    }
    if(req.query.year){
        filters.year=req.query.year
    }
    if(req.query.priceMin){
        filters.price={$gte:req.query.priceMin}
    }
    if(req.query.priceMax){
        filters.price={...filters.price,$lte:req.query.priceMax}
    }
    if(req.query.available){
        filters.available=req.query.available
    }
    if(req.query.transmission){
        filters.transmission=req.query.transmission
    }
    if(req.query.seats){
        filters.seats=req.query.seats
    }
    if(req.query.fuelType){
        filters.fuelType=req.query.fuelType
    }
    if (req.query.type && req.query.type !== "all") {
        filters.type = req.query.type
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let sortList=[]

    if (req.query.sort) {
        sortList = req.query.sort.split(',');
    }
    sortList.push('createdAt');
    const sortBy = sortList.join(' ');

    const totalCars = await carModel.countDocuments(filters);

    const cars=await carModel.find(filters).sort(sortBy).limit(limit).skip(skip)


    res.status(StatusCodes.OK).json({success:true,cars,page,totalPages:Math.ceil(totalCars / limit)})
    

    
}

const getCar=async(req,res)=>{
    const {id}=req.params;
    const car=await carModel.findById(id)
    if(!car){
        throw new NotFoundError(`No car with id ${id}`)
    }
    res.status(StatusCodes.OK).json({success:true,car:car})
}

const addCar=async(req,res)=>{
    const {brand,model,year,pricePerDay,transmission,fuelType,seats,available,type,extraKilometerPrice,unlimitedKilometerPrice, taxes, intermediateProtectionPrice, fullProtectionPrice,options}=req.body;
    const image1=req.files.image1 && req.files.image1[0]
    const image2=req.files.image2 && req.files.image2[0]
    const image3=req.files.image3 && req.files.image3[0]
    const image4=req.files.image4 && req.files.image4[0]

    const images=[image1,image2,image3,image4].filter((img)=>img != undefined)

    let imagesUrl=await Promise.all(
        images.map(async(item)=>{
            let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return  result.secure_url
        })
    )

    let carData={
        brand,
        model,
        year,
        pricePerDay:Number(pricePerDay),
        transmission,
        fuelType,
        seats:Number(seats),
        available:available==="true" ?true :false,
        type,
        image:imagesUrl,
        extraKilometerPrice: Number(extraKilometerPrice) || 0,
        unlimitedKilometerPrice: Number(unlimitedKilometerPrice) || 0,
        taxes: Number(taxes) || 0,
        intermediateProtectionPrice: Number(intermediateProtectionPrice) || 0,
        fullProtectionPrice: Number(fullProtectionPrice) || 0,
        options: options ? JSON.parse(options) : []

    }
    const car = await carModel.create(carData);
    await addNotification(null, `A new car ${car.brand} ${car.model} has been added!`, "system", "admin");

    res.json({success:true,message:"Car Added!",car})

    
}

const updateCar=async(req,res)=>{
    const {id}=req.params

    let imagesUrl=[]

    if(req.files){
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((img)=>img != undefined)

        if(images.length>0){
             imagesUrl=await Promise.all(
                images.map(async(item)=>{
                    let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                    return  result.secure_url
                })
            )
           

        }

        
    }
    const updatedData={...req.body}
    if(imagesUrl.length>0){
        updatedData.image=imagesUrl
    }
    const car=await carModel.findByIdAndUpdate(id,updatedData,{new:true,runValidators:true})

    if (!car) {
        throw new NotFoundError(`No car with id ${carId}`);
    }
    await addNotification(null, `The car "${car.model}" has been updated successfully.`, "system", "admin");

    res.status(StatusCodes.OK).json({ success: true, car });
    

}

const deleteCar=async(req,res)=>{
    const {id}=req.params;
    const car=await carModel.findByIdAndDelete(id)
    if(!car){
        throw new NotFoundError(`No car with id ${id}`);
    }
    await addNotification(null, `The car "${car.model}" has been deleted successfully.`, "system", "admin");
    res.status(StatusCodes.OK).json({success:true,car})
}

export {addCar,updateCar,deleteCar,getCar,listAllCars}