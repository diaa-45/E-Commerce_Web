const express=require("express");
const router=express.Router();
const {register,login}=require("../controller/auth")

/**
 * @description  Register New User
 * @route        /register
 * @method       post
 * @access       public
 */

router.post("/register",register);

/**
 * @description  Login User
 * @route        /login
 * @method       post
 * @access       public
 */

router.post("/login",login);

module.exports=router;