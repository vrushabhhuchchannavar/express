const express = require('express');
const controller = require('../controller/orderController');
const { vidateuser } = require('../auth/auth');
const { adminValidation } = require('../auth/adminauth');

const router = express.Router();

router.get('/read', controller.getProductsByName);

router.get('/orders', adminValidation, controller.getAllOrders);

router.post('/order', vidateuser, controller.placeOrder);

router.delete('/cancel/:id', vidateuser, controller.cancelOrder);

router.get('/order/agg', controller.getUserwithOrder);


module.exports = router;