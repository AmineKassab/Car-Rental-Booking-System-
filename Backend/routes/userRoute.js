import express from 'express'
import {getProfile, loginUser,registerUser} from '../controllers/userController.js'
import {auth} from '../middleware/authentication.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/profile',auth,getProfile)

export default userRouter