const express=require("express");
const router=express.Router();
const {  VerifyTokenAndAuthorization}=require("../midellewares/verifyTokens")
const {deleteUser,getOne,updateUser}=require("../controller/user")

/**
 * @description  Update User
 * @route        /:id
 * @method       PUT
 * @access       private
 */

router.put("/edit/:id", VerifyTokenAndAuthorization, updateUser);


/**
 * @description  Get User By ID
 * @route        /:Id
 * @method       GET
 * @access       private (only admin & Same user)
 */

router.get("/getOne/:id", VerifyTokenAndAuthorization, getOne);


/**
 * @description  Delete User By ID
 * @route        /:Id
 * @method       Delete
 * @access       private (only admin & user himself)
 */

router.delete("/delete/:id",VerifyTokenAndAuthorization, deleteUser);



module.exports=router;