const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();
const { VerifyTokenAndAdmin , VerifyTokenAndAuthorization,VerifyTokenAndToAddOeder, VerifyTokenAndDelete}=require("../midellewares/verifyTokens")
const {Order,ValidateAddOrder,ValidateUpdateOrder}=require("../models/Order");

const Products=require("../models/ProductsModel")




/**
 * @description  Adding New Order
 * @route        /add
 * @method       post
 * @access       private ( admins & Himself)
 */

router.post('/add/:productId', VerifyTokenAndAuthorization, asynchandler(
  async (req, res) => {
   
      const {error}=ValidateAddOrder(req.body);
      if(error)
        return res.status(400).json({message: error.details[0].message});

      const product= await Products.findById(req.params.productId)
      if(!product)
        return res.status(400).json({message: error.details[0].message});

      const order = new Order({
          userId:req.user.id,
          productId:req.params.productId,
          quantity:req.body.quantity,
          status:req.body.status
      });
      await order.save();

}))


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

router.delete( "/del/:id", VerifyTokenAndDelete, asynchandler(async (req, res) => {
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
  
    const order = await Order.find({userId: req.params.userId})
      .select("-password")
      .select("-_id")
      .populate(["userId", "productId"]);
    if(order){
        res.status(200).json(order);
    }else
      res.status(404).json({message : "Sorry , User order is not Found , you can add it from Products"});
  
    
  }));


  /**
 * @description  Get specific Order
 * @route        /:Id
 * @method       GET
 * @access       private (admin & Himself)
 */

router.get("/:id", VerifyTokenAndAdmin ,asynchandler(async(req,res)=>{
  
  const order = await Order.find( req.params.id )
  if(order){
      res.status(200).json(order);
  }else
    res.status(404).json({message : "Sorry , order is not Found , you can add it from Products"});

  
}));


module.exports=router