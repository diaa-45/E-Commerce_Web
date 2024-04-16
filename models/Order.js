const Joi = require("joi");
const mongoose=require("mongoose");
const orderSchema= mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    orderItems:[{
        type:mongoose.Types.ObjectId,
        ref:"OrderItem",
        required:true
    }],
    status:{
        type:String,
        enum:["done","pending"],
        default:"pending"
    }
   
}, {timestamps: true});


// validate Adding New Order

function ValidateAddOrder(obj){
    const schema=Joi.object({
        status: Joi.string().trim().required(),
        orderItems: Joi.required(),
    });
    return schema.validate(obj);
}
// validate Update Order

function ValidateUpdateOrder(obj){
    const schema=Joi.object({
        status: Joi.string().trim()
    });
    return schema.validate(obj);
}

const Order=mongoose.model("Order",orderSchema);

module.exports={
    Order,
    ValidateAddOrder,
    ValidateUpdateOrder
};