const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();
const dotenv=require("dotenv").config();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {VerifyTokenAndAdmin}=require("../midellewares/verifyTokens")

const {Products, ValidateAddProduct,ValidateUpdateProduct}=require("../models/ProductsModel")


/**
 * @description  Adding New Product
 * @route        /add
 * @method       post
 * @access       private (only admins)
 */

router.post("/add", VerifyTokenAndAdmin , asynchandler(async(req,res)=>{

    const {error}=ValidateAddProduct(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});


    const product = new Products({
        name:req.body.name,
        price:req.body.price,
        descrip:req.body.descrip
    });
    await product.save();

    res.status(201).json(product);

}));

/**
 * @description  Update Product
 * @route        /:id
 * @method       PUT
 * @access       private (only admins)
 */

router.put("/:id", VerifyTokenAndAdmin, asynchandler(async(req,res)=>{
  
    const {error}=ValidateUpdateProduct(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
  
    const updateProduct= await Products.findByIdAndUpdate(req.params.id,{
      $set:{
        name:req.body.name,
        price: req.body.price,
        descrip:req.body.descrip
      }
    },{new:true});
  
    res.status(200).json(updateProduct);
  }));

/**
 * @description  Get All Products
 * @route        /
 * @method       GET
 * @access       public 
 */

router.get("/", asynchandler(async(req,res)=>{
  
    const product =await Products.find().sort("name");
  
    res.status(200).json(product);
  }));


/**
 * @description  Get Product By ID
 * @route        /:Id
 * @method       GET
 * @access       private (only admin)
 */

router.get("/:id", asynchandler(async(req,res)=>{
  
    const product =await Products.findById(req.params.id);
    if(product){
        res.status(200).json(product);
    }else
      res.status(404).json({message : "Sorry , Product is not Found , We Will add it Later"});
  
    
  }));



/**
 * @description  Delete Product By ID
 * @route        /:Id
 * @method       Delete
 * @access       private (only admin)
 */

router.delete("/:id", VerifyTokenAndAdmin, asynchandler(async(req,res)=>{
  
    const product =await Products.findById(req.params.id);
    if(product){
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Product has been Deleted successfully"});
    }else
      res.status(404).json({message : " Product is not Found"});
  
    
  }));

module.exports=router;