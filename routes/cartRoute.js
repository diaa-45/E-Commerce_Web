const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();
const { VerifyTokenAndAdmin , VerifyTokenAndAuthorization,VerifyTokenAndToAddOeder}=require("../midellewares/verifyTokens")
//const {Order,ValidateAddOrder,ValidateUpdateOrder}=require("../models/Order");
const {Cart}=require("../models/Cart");




/**
 * @description  Delete Order By ID
 * @route        /:Id
 * @method       Delete
 * @access       private ( admin & Himself)
 */

/* router.delete("/del/:id", VerifyTokenAndAdmin, asynchandler(async(req,res)=>{
  
    const order =await Order.findById(req.params.id);
    if(order){
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Order has been Deleted successfully"});
    }else
      res.status(404).json({message : " Order is not Found"});
  
    
  })); */



/**
 * @description  Get All User Carts
 * @route        /
 * @method       GET
 * @access       private (admins) 
 */

router.get("/", VerifyTokenAndAdmin, asynchandler(async (req, res) => {
    const cart = await Cart.find()
      .select("-_id")
      .select("-__v")
      .select("-createdAt")
      .select("-updatedAt")
      .populate(["userId", "orders" ]);

    if (!cart)
      return res.status(404).send({ message: "Cart database is empty" });

    res.status(200).json(cart);
  })
);


/**
 * @description  Get User Cart
 * @route        /:Id
 * @method       GET
 * @access       private (admin & Himself)
 */

router.get("/:userId", VerifyTokenAndAuthorization ,asynchandler(async(req,res)=>{
  
    const cart = await Cart.find({ userId: req.params.userId })
      .select("-password")
      .select("-_id")
      .populate(["userId", "orders"]);
    if(cart){
        res.status(200).json(cart);
    }else
      res.status(404).json({message : "Sorry , UserCart is not Found , you can add your cart by ordering new product "});
  
    
  }));


module.exports=router