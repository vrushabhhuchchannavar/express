const express = require('express');
const controller = require('../controller/orderController');
const { vidateuser } = require('../auth/auth');
const { validateOrder } = require('../auth/authOrder');

const router = express.Router();

router.get('/read', controller.getProducts);

router.post('/order', vidateuser, controller.placeOrder);

router.delete('/cancel/:id', vidateuser, controller.cancelOrder);



module.exports = router;