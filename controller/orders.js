const asynchandler=require("express-async-handler");
const {Order,ValidateAddOrder,ValidateUpdateOrder}=require("../models/Order");
const {OrderItem}=require("../models/orderItems");

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
        const order = new Order({
            user:req.user.id,
            orderItems: orderItemsIds,
            status:req.body.status
        });
        await order.save();
        
        if(!order)
            return res.status(400).json({succses:false,message: error.details[0].message});
        res.json({succses:true,data: order})
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
    if(updateOrder!=null)
      res.status(200).json({succses:true , data: updateOrder});
    res.status(401).json({succses:false, message: "The Id isn’t match any order , please enter valid id"})
});

const deleteOne = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        await Order.findByIdAndDelete(req.params.id);
        for(const item in order.orderItems){
          await OrderItem.findByIdAndDelete(order.orderItems[item])
        }
        
        res.status(200).json({succses:true, message: "Order has been Deleted successfully",data:order });
      
    } else res.status(404).json({succses:false, message: " Order is not Found" });
});

const deleteMany = asynchandler(async (req, res) => {
    const order = await Order.find();
    if (order.length!=0) {
        await Order.deleteMany();
        await OrderItem.deleteMany();
        res.status(200).json({succses:true,NumberOfOrder:order.length, message: "Order has been Deleted successfully",data:order });
      
    }else res.status(404).json({succses: true ,message: " Database Order is Empty" });
});

const getOne=asynchandler(async(req,res)=>{
  
  const order = await Order.findById(req.params.id)
  if(order){
      res.status(200).json({succses:true ,data: order});
  }else
    res.status(404).json({succses:true,message : "Sorry , order is not Found , you can add it from Products"});

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
    if(order!=0){
        res.status(200).json({succses:true, Orders: order.length,data:order});
    }else
      res.status(404).json({succses:true , message:"No data for this user"});
  
})


module.exports={
    create,
    getUserOrders,
    getOne,
    deleteOne,
    deleteMany,
    update,
}