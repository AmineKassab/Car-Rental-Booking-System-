import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import carRouter from "./routes/carRoute.js";
import userRouter from "./routes/userRoute.js";
import couponRouter from "./routes/couponRoute.js";
import reservationRouter from "./routes/reservationRoute.js";
import notificationRouter from "./routes/notificationRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import adminStateRouter from "./routes/adminStateRoute.js";
import connectCloudinary from './config/cloudinary.js';
import connectDB from "./config/connectDB.js";

//security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

const app = express();

app.set("trust proxy", 1); 
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); 
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());

//connection to cloudinary
connectCloudinary()


//api endpoints
app.use('/api/v1/user',userRouter)
app.use('/api/v1',carRouter)
app.use('/api/v1',couponRouter)
app.use('/api/v1',reservationRouter)
app.use('/api/v1',notificationRouter)
app.use('/api/v1',reviewRouter)
app.use('/api/v1',adminStateRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


//connection to mongo DB


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();