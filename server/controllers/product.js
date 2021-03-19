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

// exports.productStar = async (req, res) => {
//   try {
//     let productId = req.params.productId
//     let product = await Product.findById({id: productId}).exec();
//     let user = await User.findOne({email:req.user.email}).exec();
//     const {star} = req.body

//     let ifUserAlreadyRated = product.ratings.find((ele) => ele.postedBy == user._id);
//     if(ifUserAlreadyRated === undefined) {
//       let notUpdated = await Product.findByIdAndUpdate({id: productId}, {
//         $push: {ratings: star, postedBy:user._id}
//       }, {new: true}).exec();
//       console.log("rating added --->", notUpdated);
//       res.json(notUpdated);
//     } else {
//       let updateNow = await Product.updateOne({ratings: { $elemMatch : ifUserAlreadyRated}}, {
//         $set: {"ratings.$.star": star}
//       }, {new: true}).exec();
//       console.log("rating updated --->", updateNow);
//       res.json(updateNow);
//     }
//   }
//   catch(err) {

//   }
// }
exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.relatedList = async (req, res) => {
  const product = await Product.findById(req.params.productId)
    .exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category
  })
  .limit(3)
  .populate('category')
  .populate('subs')
  .populate('postedBy')
  .exec();
  res.json(related);
};

const handlePrice =  async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1]
      }
    })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
    res.json(products)
  }
  catch(err) {
    console.log('price controller', err);
  }
}

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({
      category
    })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
    res.json(products)
  }
  catch(err) {
    console.log('Category controller', err);
  }
}

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body;

  if (query) {
    console.log("query ---->", query);
    await handleQuery(req, res, query);
  }
  if(price !== undefined) {
    console.log('price ---->', price);
    await handlePrice(req, res, price)
  }
  if(category !== undefined) {
    console.log('category ---->', category);
    await handleCategory(req, res, category)
  }
};
