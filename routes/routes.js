const express = require('express');
const controller = require('../controller/usercontroller');
const { vidateuser } = require('../auth/auth');
const { adminValidation } = require('../auth/adminauth');

const router = express.Router();

// router.get('/user/all', controller.getAll);

// router.get('/user/name', controller.getByName);

router.get('/userId', vidateuser, controller.getUser);

router.get('/all', adminValidation, controller.getAllUsers);

router.post('/user/reg', controller.createUser);

router.patch('/user/update', controller.updateUser);

router.delete('/user/delete/:id', controller.deleteuser);

router.post('/user/login', controller.login);

router.get('/user/logout', controller.logout);

// router.post('/:id', controller.update);

// router.delete('/id', controller.delete);


module.exports = router;