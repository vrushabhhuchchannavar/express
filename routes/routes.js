const express = require('express');
const controller = require('../controller/usercontroller');
const { vidateuser } = require('../auth/auth');
const { adminValidation } = require('../auth/adminauth');

const router = express.Router();

// router.get('/user/all', controller.getAll);

// router.get('/user/name', controller.getByName);

router.get('/userId', vidateuser, controller.getUser);

router.get('/all', controller.getAllUsers);
// adminValidation,

router.post('/user/reg', controller.createUser);

router.patch('/user/update', controller.updateUser);

router.delete('/user/delete/:id', controller.deleteuser);

router.post('/user/login', controller.login);

router.get('/user/logout', controller.logout);

// router.post('/:id', controller.update);

// router.delete('/id', controller.delete);


module.exports = router;


// - duration: 60
//       arrivalRate: 10
//       name: load requests
//     - duration: 60
//       arrivalRate: 50
//       name: increased load requests
//     - duration: 60
//       arrivalRate: 100
//       name: increased 100 load requests

// - duration: 60
//       arrivalRate: 200
//       name: increased 200 load requests

// above 1000 requests it was failing for every reqests.

// https://test.ecobillz.com/api/settings/email/v1/settings?outletId=5399f44b9e4f689450221e3a