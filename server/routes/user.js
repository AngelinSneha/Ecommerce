const express= require('express');
const router = express.Router();

//middleware
const { authCheck }= require('../middlewares/auth');

//controller
const { userCart, getUserCart }  = require("../controllers/user")

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);

// router.get('/user', (req, res) => {
//     res.json({
//         data:"this is user api",
//     })
// })
// router.

module.exports = router;