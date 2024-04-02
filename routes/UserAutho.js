const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();
const dotenv=require("dotenv").config();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {User, ValidateLoginUser,ValidateRegisterUser}=require("../models/User")

/**
 * @description  Register New User
 * @route        /register
 * @method       post
 * @access       public
 */

router.post("/register",asynchandler(async(req,res)=>{
    const {error}=ValidateRegisterUser(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});

    let user =await User.findOne({email: req.body.email});
    if(user)
        return res.status(400).json("This user already registred");

    const salt =await bcrypt.genSalt(10);
    req.body.password= await bcrypt.hash(req.body.password,salt);

    user = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin
    });
    await user.save();

    const token=jwt.sign({id: user._id , isAdmin:user.isAdmin , username:user.username},process.env.JWT_SECRET_KEY);
    const{password, ...other}=user._doc;
    res.status(201).send({...other,token});

}));

/**
 * @description  Login User
 * @route        /login
 * @method       post
 * @access       public
 */

router.post("/login",asynchandler(async(req,res)=>{
    const {error}=ValidateLoginUser(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});
    let user =await User.findOne({email: req.body.email});
    if(!user)
        return res.status(400).json("invalid email or password");
    
    const IsPassMatch = await bcrypt.compare(req.body.password, user.password);
    if(!IsPassMatch)
        return res.status(400).json("invalid email or password");

    const token=jwt.sign({id: user._id , isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY);
    const{password, ...other}=user._doc;
    res.status(200).json({...other,token});

}));

module.exports=router;