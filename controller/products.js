const express=require("express");
const asynchandler=require("express-async-handler");
require("dotenv").config();
const {Products, ValidateAddProduct,ValidateUpdateProduct}=require("../models/ProductsModel")


const create= asynchandler(async(req,res)=>{

    const {error}=ValidateAddProduct(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});


    const product = new Products({
        category:req.body.category,
        name:req.body.name,
        price:req.body.price,
        descrip:req.body.descrip
    });
    await product.save();

    res.status(201).json(product);

});

const update= asynchandler(async(req,res)=>{
  
    const {error}=ValidateUpdateProduct(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
  
    const product= await Products.findById(req.params.id)
    if(product){
      const updateProduct= await Products.findByIdAndUpdate(req.params.id,{
      $set:{
        category:req.body.category,
        name:req.body.name,
        price: req.body.price,
        descrip:req.body.descrip
      }
    },{new:true});
    res.status(200).json(updateProduct);
  }else
    res.status(401).json({success: false , message: "There is an problem "});

  
  });

const getAll = asynchandler(async(req,res)=>{
  
    const products =await Products.find().sort("name");
    if(products==0)
        res.json({success: true, message: "Products database is empty "})
    res.status(200).json({success: true ,products});
});
const getByCategory = asynchandler(async(req,res)=>{
  
    const products =await Products.find({category:req.params.category}).sort("name");
    if(products==0)
        res.json({success: true, message: "Products database Category is empty "})
    res.status(200).json({success: true ,products});
});

const getOne = asynchandler(async(req,res)=>{
  
    const product =await Products.findById(req.params.id);
    if(product){
        res.status(200).json(product);
    }else
      res.status(404).json({message : "Sorry , Product is not Found , We Will add it Later"});
  
    
  });

const deleteOne= asynchandler(async(req,res)=>{
  
    const product =await Products.findById(req.params.id);
    if(product){
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Product has been Deleted successfully", data: product});
    }else
      res.status(404).json({message : " Product is not Found"});
  
    
});

const deleteAll= asynchandler(async(req,res)=>{

    const products =await Products.find();
    if(products){
        await Products.deleteMany();
        res.status(200).json({message: "Product has been Deleted successfully", data: products});
    }else
      res.status(404).json({message : " Products is Empty "});
});

module.exports={
    create,
    getAll,
    getByCategory,
    getOne,
    deleteAll,
    deleteOne,
    update
};