const express = require('express');
const { vidateuser } = require('../auth/auth');
const taskController = require('../controller/taskController');

const router = express.Router();


router.post('/task', vidateuser, taskController.newTask);

router.get('/task', vidateuser, taskController.getTask);

router.route("/:id").put(vidateuser, taskController.updateTask).delete(vidateuser, taskController.deleteTask)


module.exports = router;