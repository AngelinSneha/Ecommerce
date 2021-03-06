const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqueid = require('uniqueid')

exports.userCart = async (req, res) => {
    console.log(req.body);
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({email: req.user.email}).exec();

    let cartOfExistingUser = await Cart.findOne({ orderedBy: user._id }).exec();

    if(cartOfExistingUser) {
        cartOfExistingUser.remove();
        console.log('removed existing user');
    }

    for(let i=0;i<cart.length;i++) {

        let object = {}
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;

        let productFromDb = await Product.findById(cart[i]._id).select("price").exec();
        console.log(productFromDb);
        object.price = productFromDb.price;

        products.push(object);
    }
    console.log('products', products);
    let cartTotal = 0
    for(let i=0;i<products.length;i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }
    console.log('cart total', cartTotal);
    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id
    }).save();
    console.log('new Cart', newCart);
    res.json({ ok: true })
};

exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
  
    let cart = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id title price totalAfterDiscount")
      .exec();
  
    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
  };

exports.emptyCart = async ( req, res ) => {
    const user = await User.findOne({ email: req.user.email }).exec();

    let cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

    res.json(cart);
}

exports.saveAddress = async (req, res) => {
    let address = req.body.address
    const user = await User.findOneAndUpdate({ email: req.user.email }, 
        {
            address
        }).exec();
    res.json({ok: true})
}

exports.applyCouponToUserCart = async (req, res) => {
    let {coupon} = req.body;
    console.log('coupon got in controllers ----->', coupon);
    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    if (validCoupon === null) {
       return res.json({
        err:'Invalid Coupon, Try a different one!'
        })
    }
    console.log('VALID COUPON', validCoupon);

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

    console.log(("cart total", cartTotal, 'discount', validCoupon.discount ));

    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount)/100).toFixed(2);

    console.log('----------------->', totalAfterDiscount);

    await Cart.findOneAndUpdate({ orderedBy: user._id }, { totalAfterDiscount }, { new: true}).exec();

    res.json(totalAfterDiscount);
}

//order
exports.createOrder = async (req, res) => {
    let {paymentIntent} = req.body.stripeResponse;

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products } = await Cart.findOne({ orderedBy: user._id })
    .exec();

    let newOrder = await new Order({
        products,
        paymentIntent,
        orderedBy: user._id
    }).save();

    //decrease quantity
    let bulkProduct = products.map((item) => {
        return {
            updateOne: {
                filter: {_id: item.product._id},
                update: {$inc: { quantity: -item.count, sold: +item.count }}
            }
        }
    })
    let updated = await Product.bulkWrite(bulkProduct, {});
    console.log('PRODUCT QUANTITY DECREMENTED', updated);

    console.log('NEW ORDER SAVED ---> ', newOrder);
    res.json({ ok: true })
}

exports.orders = async (req, res) => {
    
    const user = await User.findOne({ email: req.user.email }).exec();

    const userOrder = await Order.find({orderedBy: user._id }).populate("products.product").exec();

    res.json(userOrder)
}

exports.addToWishlist = async (req, res) => {
    const {productId} = req.body;

    const user = await User.findOneAndUpdate({email: req.user.email}, {$addToSet: {wishlist: productId}}).exec()
    res.json({ ok: true })
}

exports.wishlist = async (req, res) => {
    const list = await User.findOne({email: req.user.email}).select('wishlist').populate("wishlist").exec();

    res.json(list);
}

exports.removeFromWishlist = async (req, res) => {
    const {productId} = req.params;
    const user = await User.findOneAndUpdate({email: req.user.email}, {$pull: {wishlist: productId}}).exec();
    res.json({ ok: true })
}

exports.createcashOrder = async (req, res) => {
    let {COD, couponApplied} = req.body;
    if(!COD) {
        return res.status(400).send("CREATE CASH ORDER FAILED")
    }
    const user = await User.findOne({ email: req.user.email }).exec();

    let userCart = await Cart.findOne({ orderedBy: user._id })
    .exec();

    let finalAmount = 0;

  if(couponApplied && userCart.totalAfterDiscount) {
      console.log('yayy coupon applied');
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    console.log('not applied');
    finalAmount = userCart.cartTotal * 100;
  }

    let newOrder = await new Order({
        products:userCart.products,
        paymentIntent: {
            id: Math.floor(100000000000000000 + Math.random() * 900000000000000000 ),
            "amount": finalAmount,
            "created": Date.now(),
            "currency": "inr",
            "payment_method_types": [
                "cash"
            ],
            "status": "Cash On Delivery"
        },
        orderedBy: user._id,
        orderStatus: "Cash On Delivery"
    }).save();

    //decrease quantity
    let bulkProduct = userCart.products.map((item) => {
        return {
            updateOne: {
                filter: {_id: item.product._id},
                update: {$inc: { quantity: -item.count, sold: +item.count }}
            }
        }
    })
    let updated = await Product.bulkWrite(bulkProduct, {});
    console.log('PRODUCT QUANTITY DECREMENTED', updated);

    console.log('NEW ORDER SAVED ---> ', newOrder);
    res.json({ ok: true })
}