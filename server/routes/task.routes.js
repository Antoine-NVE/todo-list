const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');

router.post('/', taskController.create);
router.get('/:id', taskController.readOne);
router.get('/', taskController.readAll);
router.put('/:id', taskController.update);
router.post('/:id', taskController.delete);

module.exports = router;
