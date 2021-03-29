const express= require('express');
const router = express.Router();

//middleware
const { authCheck }= require('../middlewares/auth');

//controller
const { userCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, createOrder, orders }  = require("../controllers/user")

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

//coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

//order
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders)
// router.get('/user', (req, res) => {
//     res.json({
//         data:"this is user api",
//     })
// })
// router.

module.exports = router;