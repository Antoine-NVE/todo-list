const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task: { type: String, required: true, maxLength: 64 },
    isDone: { type: Boolean, required: true },
});

module.exports = mongoose.model('Task', taskSchema);
