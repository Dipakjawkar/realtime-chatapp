const express = require('express');

const {signup,signin,signout, getUser, verifyUser} = require('../controller/userController')
const {authMiddleware} = require("../middleware/userMiddleware") 
const userRoute = express.Router();

userRoute.post('/signup',signup)
userRoute.get('/',authMiddleware,getUser)
userRoute.post('/signin',signin)
userRoute.get('/verify',authMiddleware,verifyUser)
userRoute.get('/signout',authMiddleware,signout)

module.exports = userRoute

