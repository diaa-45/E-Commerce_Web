const express=require("express");
const router=express.Router();
require("dotenv").config();
const {VerifyTokenAndAdmin,VerifyTokenView}=require("../midellewares/verifyTokens")
const {
  create,
  deleteAll,
  deleteOne,
  getAll,
  getByCategory,
  getOne,
  update
}=require("../controller/products")

/**
 * @description  Adding New Product
 * @route        /add
 * @method       post
 * @access       private (only admins)
 */

router.post("/add", VerifyTokenAndAdmin ,create );

/**
 * @description  Update Product
 * @route        /edit/:id
 * @method       PUT
 * @access       private (only admins)
 */

router.put("/edit/:id", VerifyTokenAndAdmin, update);

/**
 * @description  Get All Products
 * @route        /getAll
 * @method       GET
 * @access       public 
 */

router.get("/getAll", getAll);

/**
 * @description  Get All Products At Specific Category
 * @route        /getCategory/:category
 * @method       GET
 * @access       public 
 */

router.get("/getCategory/:category", getByCategory);


/**
 * @description  Get Product By ID
 * @route        /getOne/:Id
 * @method       GET
 * @access       private (only admin)
 */

router.get("/getOne/:id", getOne);



/**
 * @description  Delete Product By ID
 * @route        /deleteOne/:Id
 * @method       Delete
 * @access       private (only admin)
 */

router.delete("/deleteOne/:id", VerifyTokenAndAdmin, deleteOne);


/**
 * @description  Delete All
 * @route        /deleteAll
 * @method       Delete
 * @access       private (only admin)
 */

router.delete("/deleteAll", VerifyTokenAndAdmin, deleteAll);

module.exports=router;