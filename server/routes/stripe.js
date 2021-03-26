const express = require("express");
const router = express.Router();

//middlewares
const { authCheck }= require('../middlewares/auth');

//controllers
const { createPaymentIntent } = require("../controllers/stripe");
const { route } = require('./user')

//routes
router.post("/create-payment-intent", authCheck, (req, res) => {
    createPaymentIntent
});
// router.get("/coupons", list);
// router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;