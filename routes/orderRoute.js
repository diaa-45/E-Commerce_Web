const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();
const { VerifyTokenAndAdmin , VerifyTokenAndAuthorization,VerifyTokenAndToAddOeder}=require("../midellewares/verifyTokens")
const {Order,ValidateAddOrder,ValidateUpdateOrder}=require("../models/Order");
const {Cart}=require("../models/Cart");




/**
 * @description  Adding New Order
 * @route        /add
 * @method       post
 * @access       private ( admins & Himself)
 */

router.post('/add/:userId', VerifyTokenAndAuthorization, asynchandler(
  async (req, res) => {
   
      const userId  = req.params.userId;
      const {error}=ValidateAddOrder(req.body);
      if(error)
        return res.status(400).json({message: error.details[0].message});

      const order = new Order({
          userId:userId,
          productId:req.body.productId,
          quantity:req.body.quantity,
          status:req.body.status
      });
      await order.save();

      const userCart= await Cart.findOne({userId:req.params.userId});
      if(!userCart){
        const cart = new Cart({
        userId:userId,
        orderId:order
        });
        await cart.save();
      }

      else{
        userCart.orders.push(order);
        await userCart.save();
      }

      
      
      res.status(201).json(order);
    }
));


/**
 * @description  Update Order
 * @route        /:id
 * @method       PUT
 * @access       private ( admins & Himself)
 */

router.put("/edit/:id", VerifyTokenAndAuthorization, asynchandler(async(req,res)=>{

    const {error}=ValidateUpdateOrder(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
    
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

router.delete( "/del/:id", VerifyTokenAndAdmin, asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order has been Deleted successfully" });
    } else res.status(404).json({ message: " Order is not Found" });
    
  })
);



/**
 * @description  Get All Orders
 * @route        /
 * @method       GET
 * @access       private (admins) 
 */

router.get("/", VerifyTokenAndAdmin, asynchandler(async (req, res) => {
    const order = await Order.find()
      .select("-__v")
      .select("-createdAt")
      .select("-updatedAt")
      .populate(["userId", "productId"]);

    if (!order)
      return res.status(404).send({ message: "Order database is empty" });

    res.status(200).json(order);
  })
);


/**
 * @description  Get User Order
 * @route        /:Id
 * @method       GET
 * @access       private (admin & Himself)
 */

router.get("/:userId", VerifyTokenAndAuthorization ,asynchandler(async(req,res)=>{
  
    const order = await Order.findById(req.params.userId)
      .select("-password")
      .select("-_id")
      .populate(["userId", "productId"]);
    if(order){
        res.status(200).json(order);
    }else
      res.status(404).json({message : "Sorry , order is not Found , you can add it from Products"});
  
    
  }));


  /**
 * @description  Get User Order
 * @route        /:Id
 * @method       GET
 * @access       private (admin & Himself)
 */

router.get("/:id", VerifyTokenAndAuthorization ,asynchandler(async(req,res)=>{
  
  const order = await Order.find( req.params.id )
    
  if(order){
      res.status(200).json(order);
  }else
    res.status(404).json({message : "Sorry , order is not Found , you can add it from Products"});

  
}));


module.exports=router