const Joi = require("joi");
const mongoose=require("mongoose");
const productSchema= mongoose.Schema({
    category:{
        type:String,
        required:true,
        trim:true,
        enum:["Laptob","Food"]
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    descrip:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
        maxlength:500
    }
}, {timestamps: true});

const Products=mongoose.model("Products",productSchema);

// validate Adding New Product

function ValidateAddProduct(obj){
    const schema=Joi.object({
        category: Joi.string().trim().required(),
        name: Joi.string().trim().max(100).min(2).required(),
        price: Joi.string().trim().required(), 
        descrip: Joi.string().trim().min(10).max(500).required()
    });
    return schema.validate(obj);
}
// validate Update Product

function ValidateUpdateProduct(obj){
    const schema=Joi.object({
        name: Joi.string().trim().max(100).min(2),
        price: Joi.string().trim(),
        descrip: Joi.string().trim().min(10).max(500)
    });
    return schema.validate(obj);
}


module.exports={
    Products,
    ValidateAddProduct,
    ValidateUpdateProduct
};