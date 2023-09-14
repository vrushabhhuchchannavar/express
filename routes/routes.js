const express = require('express');
const controller = require('../controller/usercontroller');
const { vidateuser } = require('../auth/auth');

const router = express.Router();

// router.get('/user/all', controller.getAll);

// router.get('/user/name', controller.getByName);

router.get('/userId', vidateuser, controller.getById);

router.post('/user/reg', controller.createUser);

router.post('/user/login', controller.login);

router.get('/user/logout', controller.logout);

// router.post('/:id', controller.update);

// router.delete('/id', controller.delete);


module.exports = router;