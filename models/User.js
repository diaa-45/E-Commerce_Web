const Joi = require("joi");
const mongoose=require("mongoose");
const userSchema= mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:20,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:20,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100
    },
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:20,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    

}, {timestamps: true});

const User=mongoose.model("User",userSchema);

// validate register user

function ValidateRegisterUser(obj){
    const schema=Joi.object({
        email: Joi.string().email().trim().max(100).min(5).required(),
        username: Joi.string().trim().max(20).min(2).required(), 
        password: Joi.string().trim().min(6).required(),
        firstname: Joi.string().trim().max(20).min(2).required(),
        lastname: Joi.string().trim().max(20).min(2).required(), 
        phone: Joi.string().trim().length(11)
                  .regex(/^(?:(?:\+20|0)?1[0-2]\d{8}|(?:(?:\+20|0)?[2-9]\d{8}))$/).required(), 
        isAdmin: Joi.boolean()
    });
    return schema.validate(obj);
}
// validate login user

function ValidateLoginUser(obj){
    const schema=Joi.object({
        email: Joi.string().email().trim().max(100).min(5).required(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}

// validate Update user

function ValidateUpdateUser(obj){
    const schema=Joi.object({
        email: Joi.string().email().trim().max(100).min(5),
        username: Joi.string().trim().max(20).min(2), 
        password: Joi.string().trim().min(6),
        firstname: Joi.string().trim().max(20).min(2),
        lastname: Joi.string().trim().max(20).min(2), 
        phone: Joi.string().trim().length(11)
                  .regex(/^(?:(?:\+20|0)?1[0-2]\d{8}|(?:(?:\+20|0)?[2-9]\d{8}))$/)
    });
    return schema.validate(obj);
}

module.exports={
    User,
    ValidateRegisterUser,
    ValidateLoginUser,
    ValidateUpdateUser
};