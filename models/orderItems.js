const mongoose=require("mongoose");
const orderItemSchema= mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Products"
    },
    quantity:{
        type:Number,
        default:1
    }
},{timestamps: true});



const OrderItem=mongoose.model("OrderItem",orderItemSchema);

module.exports={
    OrderItem
};