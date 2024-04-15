const express=require("express");
const router=express.Router();
const {
  VerifyTokenAndAdmin,
  VerifyTokenAndAuthorization,
  VerifyTokenAndDelete,
  VerifyTokenView
}=require("../midellewares/verifyTokens")
const {
  create,
  getAll,
  deleteOne,
  getOne,
  getUserOrders,
  update,
  deleteMany,
  getAllOrderItems
}=require('../controller/orders')


/**
 * @description  Adding New Order
 * @route        /add
 * @method       post
 * @access       private ( admins & Himself)
 */

router.post('/add', VerifyTokenView, create)


/**
 * @description  Update Order
 * @route        /:id
 * @method       PUT
 * @access       private ( admins & Himself)
 */

router.put("/edit/:id", VerifyTokenAndAdmin,update);

/**
 * @description  Delete Order By ID
 * @route        /:Id
 * @method       Delete
 * @access       private ( admin & Himself)
 */

router.delete( "/delete/:id", VerifyTokenAndDelete, deleteOne);

/**
 * @description  Delete All orders
 * @route        /
 * @method       Delete
 * @access       private ( admin & Himself)
 */

router.delete( "/deleteAll", VerifyTokenAndAdmin, deleteMany);


/**
 * @description  Get All Orders
 * @route        /
 * @method       GET
 * @access       private (admins) 
 */

router.get("/", VerifyTokenAndAdmin, getAll);



/**
 * @description  Get All Order Items
 * @route        /
 * @method       GET
 * @access       private (admins) 
 */

router.get("/orderItems", VerifyTokenAndAdmin, getAllOrderItems);


/**
 * @description  Get User Order
 * @route        /:Id
 * @method       GET
 * @access       private (admin & Himself)
 */

router.get("/user/:id", VerifyTokenAndAuthorization ,getUserOrders);


  /**
 * @description  Get specific Order
 * @route        /:Id
 * @method       GET
 * @access       private (admin & Himself)
 */

router.get("/getOrder/:id", VerifyTokenAndAdmin ,getOne);


module.exports=router