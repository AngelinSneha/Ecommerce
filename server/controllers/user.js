const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
    console.log(req.body);
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({email: req.user.email}).exec();
}