const express = require('express');
const controller = require('../controller/orderController');
const { vidateuser } = require('../auth/auth');
const { validateOrder } = require('../auth/authOrder');

const router = express.Router();

router.post('/order', vidateuser, controller.placeOrd);

router.delete('/cancel/:id', vidateuser, controller.cancel);



module.exports = router;