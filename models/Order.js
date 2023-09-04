const Joi = require("joi");
const mongoose=require("mongoose");
const orderSchema= mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    products:[
        {
            productId:{
                type:mongoose.Types.ObjectId,
                ref:"Products"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    status:{
        type:String,
        enum:["done","pending"],
        default:"pending"
    }
   
}, {timestamps: true});

const Order=mongoose.model("Order",orderSchema);

module.exports={
    Order
};