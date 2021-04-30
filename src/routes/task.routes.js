const express = require('express');
const router = express.Router();
//'Router' un metodo para devolver un objeto para ingresar rutas 

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);

});

router.post('/', async (req, res) =>{
    const { title, description } = req.body;
    const task = new Task({title, description});
    await task.save();
    console.log(task);
    res.json({status: 'Task Saved'});
});
module.exports = router;