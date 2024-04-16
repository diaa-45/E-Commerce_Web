const express=require("express");
const router=express.Router();
const {VerifyTokenAndAuthorization,VerifyTokenView, VerifyTokenAndDelete}=require("../midellewares/verifyTokens")
const {create,getOne,deleteMany,deleteOne,getUserOrders,update}=require("../controller/orders");



router.post('/add', VerifyTokenView, create)

router.put("/edit/:id", VerifyTokenAndDelete, update);

router.delete( "/delete/:id", VerifyTokenAndDelete, deleteOne);

router.delete( "/deleteAll/:userId", VerifyTokenAndAuthorization, deleteMany); // del many

router.get("/user/:id", VerifyTokenAndAuthorization ,getUserOrders);

router.get("/getOrder/:id", VerifyTokenAndDelete ,getOne);



module.exports=router

















module.exports=router