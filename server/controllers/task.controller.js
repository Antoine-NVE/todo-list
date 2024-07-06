const Task = require('../models/task.model');

exports.create = async (req, res) => {
    let task = new Task({
        task: req.body.task,
        isDone: req.body.isDone,
    });

    try {
        task = await task.save();

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.readOne = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });

        res.status(200).json(task);
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.readAll = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.update = async (req, res) => {
    try {
        await Task.updateOne({ _id: req.params.id }, { task: req.body.task, isDone: req.body.isDone }, { runValidators: true });

        res.status(200).json({ message: 'Tâche modifiée' });
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.delete = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Tâche supprimée' });
    } catch (error) {
        res.status(400).json(error);
    }
};
