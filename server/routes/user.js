const express= require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.json({
        data:"this is user api",
    })
})
module.exports = router;