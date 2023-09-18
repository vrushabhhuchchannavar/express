const express = require('express');
const controller = require('../controller/adminController');
const { adminValidation } = require('../auth/adminauth');

const router = express.Router();

router.post('/', controller.createAdmin);

router.post('/add', adminValidation, controller.addProducts);

router.patch('/update', adminValidation, controller.updateProduct);

router.delete('/delete', adminValidation, controller.deleteProduct);

module.exports = router;