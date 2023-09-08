const errorHandler = require('../middleware/errorclass');
const Task = require('../models/task');

exports.newTask = async(req, res) => {
    try { 
        const { title, description } = req.body;
        const user = req.user;
        
        const task = await Task.create({ title,  description, user });
        
        // console.log(`task: ${JSON.stringify(task)}`)
        res.status(201).send({ error: false, message: 'task added.' });
    } catch (err) {
        res.send({ error: true, result: err });
    }
} 

exports.getTask = async(req, res) => {
    try {
        const userId = req.user._id;
        // console.log(`user: ${userId}`);
        const task = await Task.find({ user: userId });
        // console.log(`task: ${JSON.stringify(task)}`)
        res.status(201).send({ error: false, result: task });
    } catch (err) {
        res.status(500).send({ error: true, result: err });
    }
}

exports.updateTask = async(req, res, next) => {
    try {

        const id = req.params.id;
        const task = await Task.findById(id);
        
        if(!task) {
            return next(new errorHandler('task is not found.', 404));
            // throw new Error('task is not found.');
        }

        task.isCompleted = !task.isCompleted;
        await task.save();
        
        res.status(201).send({ error: false, result: task })
    } catch (err) {
        // console.log('getting inside.')
        res.status(500).send({ error: true, err });
    }
}

exports.deleteTask = async(req, res) => {
    try {

        const id = req.params.id;
        const task = await Task.deleteOne({_id: id});
        if (!task) return next(new errorHandler('task is not found.', 404));

        res.status(201).send({ error: false, result: task });
    } catch (err) {
        res.status(500).send({ error: true, err });
    }
}