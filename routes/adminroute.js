const express = require('express');
const controller = require('../controller/adminController');
const { adminValidation } = require('../auth/adminauth');

const router = express.Router();

router.post('/', controller.create);

router.post('/add', adminValidation, controller.add);

router.get('/read', controller.get);

router.patch('/update', adminValidation, controller.update);

router.delete('/delete', adminValidation, controller.delete);

router.get('/all', adminValidation, controller.getUser);

router.get('/orders', adminValidation, controller.orders);

module.exports = router;