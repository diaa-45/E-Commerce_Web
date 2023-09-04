const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();
const { VerifyTokenAndAdmin , VerifyTokenAndAuthorization,VerifyTokenAndToAddOeder}=require("../midellewares/verifyTokens")
const {Order}=require("../models/Order");




/**
 * @description  Adding New Order
 * @route        /add
 * @method       post
 * @access       private ( admins & Himself)
 */

router.post("/add/:id", VerifyTokenAndAuthorization , asynchandler(async(req,res)=>{

    const newOrder = new Order({
      userId:req.params.id,
      products:req.body.products,
      status:req.body.status
    });
    await newOrder.save();

    res.status(201).json(newOrder);

}));


/**
 * @description  Update Order
 * @route        /:id
 * @method       PUT
 * @access       private ( admins & Himself)
 */

router.put("/edit/:id", VerifyTokenAndAuthorization, asynchandler(async(req,res)=>{

    const updateOrder= await Order.findByIdAndUpdate(req.params.id,
    {
      $set: req.body
    },
    {new:true});
  
    res.status(200).json(updateOrder);
  }));

/**
 * @description  Delete Order By ID
 * @route        /:Id
 * @method       Delete
 * @access       private ( admin & Himself)
 */

router.delete("/del/:id", VerifyTokenAndAdmin, asynchandler(async(req,res)=>{
  
    const order =await Order.findById(req.params.id);
    if(order){
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Order has been Deleted successfully"});
    }else
      res.status(404).json({message : " Order is not Found"});
  
    
  }));



/**
 * @description  Get All Orders
 * @route        /
 * @method       GET
 * @access       private (admins) 
 */

router.get("/", VerifyTokenAndAdmin, asynchandler(async(req,res)=>{
  
    const order =await Order.find();
  
    res.status(200).json(order);
  }));


/**
 * @description  Get User Order
 * @route        /:Id
 * @method       GET
 * @access       private (admin & Himself)
 */

router.get("/:userId", VerifyTokenAndAuthorization ,asynchandler(async(req,res)=>{
  
    const order =await Order.find({userId: req.params.userId});
    if(order){
        res.status(200).json(order);
    }else
      res.status(404).json({message : "Sorry , order is not Found , you can add it from Products"});
  
    
  }));


module.exports=router