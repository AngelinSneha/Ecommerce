const express = require("express");
const router = express.Router();

//middleware
const { authCheck, adminCheck}= require('../middlewares/auth');

//controller
const {create, listAll, list, remove, read, update, count, productStar, relatedList, searchFilters} = require('../controllers/product');
//routes
router.post('/product', authCheck, adminCheck, create);
router.get("/products/count", count);
router.get('/products/:count', listAll);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.post('/products', list);
router.put("/product/star/:productId", authCheck, productStar);
router.get('/product/related/:productId', relatedList);
//search
router.post("/search/filters", searchFilters);

module.exports = router;