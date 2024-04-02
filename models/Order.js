const Joi = require("joi");
const mongoose=require("mongoose");
const orderSchema= mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Products"
    },
    quantity:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        enum:["done","pending"],
        default:"pending"
    }
   
}, {timestamps: true});


// validate Adding New Order

function ValidateAddOrder(obj){
    const schema=Joi.object({
        productId: Joi.string().trim().required(), 
        status: Joi.string().trim().required(),
        quantity: Joi.number().required(),
    });
    return schema.validate(obj);
}
// validate Update Order

function ValidateUpdateOrder(obj){
    const schema=Joi.object({
        userId: Joi.type(mongoose.Types.ObjectId).trim(),
        products: Joi.type(mongoose.Types.ObjectId).trim(),
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