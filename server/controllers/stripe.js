const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency:'INR',
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    });
}