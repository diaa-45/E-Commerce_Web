const asynchandler=require("express-async-handler");
require("dotenv").config();
const {Products}=require("../models/ProductsModel")



const getAll = asynchandler(async(req,res)=>{
  
  const products =await Products.find().sort("category");
  if(products==0)
    res.json({success: true, message: "Products database is empty "})
  res.status(200).json({
    success:true,
    data:products
  });
});
const getByCategory = asynchandler(async(req,res)=>{
  
    const products =await Products.find({category:req.params.category}).sort("name");
    if(products==0)
        res.json({success: true, message: "Products database Category is empty "})
    res.status(200).json({
      success:true,
      data:products
    });
});

const getOne = asynchandler(async(req,res)=>{
  
    const product =await Products.findById(req.params.id);
    if(product){
      res.status(200).json({
        success:true,
        data:product
      });
    }else
      res.status(404).json({message : "Sorry , Product is not Found , We Will add it Later"});
  
    
});


module.exports={
  getAll,
  getByCategory,
  getOne
};