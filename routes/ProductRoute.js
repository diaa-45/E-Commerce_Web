const express=require("express");
const router=express.Router();
const {getAll,getByCategory,getOne}=require("../controller/products")


/**
 * @description  Get All Products
 * @route        /
 * @method       GET
 * @access       public 
 */

router.get("/getAll", getAll);


/**
 * @description  Get Product By ID
 * @route        /:Id
 * @method       GET
 * @access       public 
 */

router.get("/getOne/:id", getOne);


/**
 * @description  Get Product By Category
 * @route        /:Id
 * @method       GET
 * @access       public
 */

router.get("/getCategory/:category", getByCategory);





module.exports=router;