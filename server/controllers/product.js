const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};

// exports.read = async (req, res) => {
//   const product = await Product.findOne({ slug: req.params.slug })
//     .populate("category")
//     .populate("subs")
//     .exec();
//   res.json(product);
// };
exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updated = await Product.findOneAndUpdate(
        { slug: req.params.slug },
        req.body,
        { new: true }
      ).exec();
      res.json(updated);
    } catch (err) {
      console.log("PRODUCT UPDATE ERROR ----> ", err);
      // return res.status(400).send("Product update failed");
      res.status(400).json({
        err: err.message,
      });
    }
  };

// without pagination
// exports.list = async (req, res) => {
//   try {
//     const {sort, order, limit} = req.body
//     let products = await Product.find({})
//     .populate('category')
//     .populate('subs')
//     .sort([[sort, order]])
//     .limit(limit)
//     .exec();
//     res.json(products);
//   } 
//   catch(err) {
//     console.log('LIST ---->', err);
//   }
// }

//with pagination
exports.list = async (req, res) => {
  try {
    const {sort, order, page} = req.body
    const currentPage = page || 1;
    const perPage = 3;
    let products = await Product.find({})
    .skip((currentPage-1)*perPage)
    .populate('category')
    .populate('subs')
    .sort([[sort, order]])
    .limit(perPage)
    .exec();
    res.json(products);
  } 
  catch(err) {
    console.log('LIST ---->', err);
  }
}

exports.count = async (req, res) => {
  let totalProducts = await Product.find({}).estimatedDocumentCount().exec();
  res.json(totalProducts)
}

exports.rating = async (req, res) => {
  try {
    let productId = req.params.productId
    let product = await Product.findById({id: productId}).exec();
    let user = await User.findOne({email:req.user.email}).exec();
    const {star} = req.body

    let ifUserAlreadyRated = product.ratings.find((ele) => ele.postedBy == user._id);
    if(ifUserAlreadyRated === undefined) {
      let notUpdated = await Product.findByIdAndUpdate({id: productId}, {
        $push: {ratings: star, postedBy:user._id}
      }, {new: true}).exec();
      console.log("rating added --->", notUpdated);
      res.json(notUpdated);
    } else {
      let updateNow = await Product.updateOne({ratings: { $elemMatch : ifUserAlreadyRated}}, {
        $set: {"ratings.$.star": star}
      }, {new: true}).exec();
      console.log("rating updated --->", updateNow);
      res.json(updateNow);
    }
  }
  catch(err) {

  }
}