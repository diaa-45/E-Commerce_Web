const asynchandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {User,ValidateUpdateUser}=require("../models/User");


const updateUser= asynchandler(async(req,res)=>{
  
  const {error}=ValidateUpdateUser(req.body);
  if(error)
    return res.status(400).json({message: error.details[0].message});

  if(req.body.password){
    const salt= await bcrypt.genSalt(10);
    req.body.password= await bcrypt.hash(req.body.password,salt);
  }

  const updateUser= await User.findByIdAndUpdate(req.params.id,{
    $set:{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        phone:req.body.phone
    }
  },{new:true}).select("-password");

  res.status(200).json(updateUser);
});


const getAll= asynchandler(async(req,res)=>{
  
  const users =await User.find().select("-password");

  res.status(200).json(users);
});


const getOne= asynchandler(async(req,res)=>{
  
  const user =await User.findById(req.params.id).select("-password");
  if(user){
      res.status(200).json(user);
  }else
    res.status(404).json({message : " User not Found"});

  
});


const deleteUser = asynchandler(async(req,res)=>{
  
  const user =await User.findById(req.params.id);
  if(user){
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message: "User has been Deleted successfully", data: user});
  }else
    res.status(404).json({message : " User not Found"});

  
});



module.exports={
    getAll,
    getOne,
    updateUser,
    deleteUser
};