const asynchandler=require("express-async-handler");
const {Order,ValidateAddOrder,ValidateUpdateOrder}=require("../models/Order");
const {OrderItem}=require("../models/orderItems");
const Products=require("../models/ProductsModel");

const create = asynchandler(
  async (req, res) => {
    const {error}=ValidateAddOrder(req.body);
    if(error)
    return res.status(400).json({message: error.details[0].message});

    try {
        const orderItemsIds = [];
        
        for (const orderItem of req.body.orderItems) {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            });
            newOrderItem = await newOrderItem.save();
            orderItemsIds.push(newOrderItem._id);
        }
        console.log(orderItemsIds);
        const order = new Order({
            user:req.user.id,
            orderItems: orderItemsIds,
            status:req.body.status
        });
        await order.save();
        
        if(!order)
            return res.status(400).json({message: error.details[0].message});
        res.json(order)
    } catch (error) {
        console.error(`Error saving order items: ${error.message}`);
    }

})


const update = asynchandler(async(req,res)=>{

    const {error}=ValidateUpdateOrder(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
    
    const updateOrder= await Order.findByIdAndUpdate(req.params.id,
    {
      $set: req.body
    },
    {new:true});
  
    res.status(200).json(updateOrder);
  });


const deleteOne = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order has been Deleted successfully" });
      
    } else res.status(404).json({ message: " Order is not Found" });
  });

const deleteMany = asynchandler(async (req, res) => {
    const order = await Order.find();
    if (order) {
        await Order.deleteMany();
        res.status(200).json({ message: "Order has been Deleted successfully" });
      
    } else res.status(404).json({succses: true ,message: " Database Order is Empty" });
  });


const getAll = asynchandler(async (req, res) => {
    const order = await Order.find()
      .select("-__v")
      .populate("user")
      .populate({
        path: 'orderItems', populate:{
            path:'product'
        }
      });

    if (!order)
      return res.status(404).send({ message: "Order database is empty" });

    res.status(200).json(order);
  });



const getUserOrders=asynchandler(async(req,res)=>{
  
    const order = await Order.find({user: req.params.id})
    .select("-__v")
    .populate("user")
    .populate({
      path: 'orderItems', populate:{
          path:'product'
      }
    });
    if(order){
        res.status(200).json(order);
    }else
      res.status(404).json({message : "Sorry , User order is not Found , you can add it from Products"});
  
    
  })


const getOne=asynchandler(async(req,res)=>{
  
  const order = await Order.find( req.params.id )
  if(order){
      res.status(200).json(order);
  }else
    res.status(404).json({message : "Sorry , order is not Found , you can add it from Products"});

  
});


module.exports={
    create,
    getAll,
    getOne,
    getUserOrders,
    deleteOne,
    deleteMany,
    update
}