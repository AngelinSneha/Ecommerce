const Product = require('../models/product');
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct =  await new Product(req.body).save();
        res.json(newProduct);
    }
    catch(err) {
        console.log(err);
        res.json({
            err: err.message,
        })
        res.status(400).send('Product creation failed');
    }
};

exports.listAll = async (req, res) => {
    let product = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort([["createdAt", "desc"]])
    .exec();
    res.json(product);
}