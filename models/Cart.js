const Joi = require("joi");
const mongoose=require("mongoose");
const cartSchema= mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    orders:[{
        orderId:{
            type:mongoose.Types.ObjectId,
            ref:"Order"
        }
    }]
   
}, {timestamps: true});

const Cart=mongoose.model("Cart",cartSchema);

module.exports = {
  Cart
};
