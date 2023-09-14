const express = require('express');
const controller = require('../controller/adminController');
const { adminValidation } = require('../auth/adminauth');

const router = express.Router();

router.post('/', controller.createAdmin);

router.post('/add', adminValidation, controller.addProducts);

router.patch('/update', adminValidation, controller.updateProduct);

router.delete('/delete', adminValidation, controller.deleteProduct);

router.get('/all', adminValidation, controller.getAllUsers);

router.get('/orders', adminValidation, controller.getAllOrders);

module.exports = router;