const asynchandler=require("express-async-handler");
require("dotenv").config();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {User, ValidateLoginUser,ValidateRegisterUser}=require("../models/User")


const register = asynchandler(async(req,res)=>{
    const {error}=ValidateRegisterUser(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});

    let user =await User.findOne({email: req.body.email});
    if(user)
        return res.status(400).json(`The user ${req.body.email} has already registred`);

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

});


const login = asynchandler(async(req,res)=>{
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

});

module.exports={
    register,
    login,
};