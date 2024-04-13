const express=require("express");
const router=express.Router();
const { VerifyTokenAndAdmin , VerifyTokenAndAuthorization}=require("../midellewares/verifyTokens")
const {deleteUser,getAll,getOne,updateUser}=require("../controller/user");



/**
 * @description  Update User
 * @route        /:id
 * @method       PUT
 * @access       private
 */

router.put("/:id", VerifyTokenAndAuthorization, updateUser);

/**
 * @description  Get All Users
 * @route        /
 * @method       GET
 * @access       private (only admin)
 */

router.get("/", VerifyTokenAndAdmin, getAll);

/**
 * @description  Get User By ID
 * @route        /:Id
 * @method       GET
 * @access       private (only admin & Same user)
 */

router.get("/:id", VerifyTokenAndAuthorization, getOne);


/**
 * @description  Delete User By ID
 * @route        /:Id
 * @method       Delete
 * @access       private (only admin & user himself)
 */

router.delete("/:id",VerifyTokenAndAdmin, deleteUser);



module.exports=router;