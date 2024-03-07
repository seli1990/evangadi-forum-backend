const express = require('express');
const router = express.Router()
//authentication middleware
const  authMiddleware = require('../middlware/authMiddleware')

//user controllers
const {register,login,checkUser} = require ('../controller/userController.js')




//register user
router.post("/register", register);

//login user
router.post("/login", login);



//check user
router.get("/check", authMiddleware, checkUser);


module.exports = router;
