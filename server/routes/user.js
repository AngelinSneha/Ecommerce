const express= require('express');
const router = express.Router();

//middleware
const { authCheck }= require('../middlewares/auth');

//controller
const { userCart }  = require("../controllers/user")

router.post('/cart', authCheck, userCart);

// router.get('/user', (req, res) => {
//     res.json({
//         data:"this is user api",
//     })
// })
// router.

module.exports = router;