const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();
const {VerifyTokenView}=require("../midellewares/verifyTokens")
const {Products}=require("../models/ProductsModel")


/**
 * @description  Get All Products
 * @route        /
 * @method       GET
 * @access       public 
 */

router.get("/",VerifyTokenView, asynchandler(async(req,res)=>{
  
    const product =await Products.find().sort("name");
  
    res.status(200).json(product);
  }));


/**
 * @description  Get Product By ID
 * @route        /:Id
 * @method       GET
 * @access       private (only admin)
 */

router.get("/:id",VerifyTokenView, asynchandler(async(req,res)=>{
  
    const product =await Products.findById(req.params.id);
    if(product){
        res.status(200).json(product);
    }else
      res.status(404).json({message : "Sorry , Product is not Found , We Will add it Later"});
  
    
  }));





module.exports=router;