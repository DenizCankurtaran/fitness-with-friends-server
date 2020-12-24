const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    exercise: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: String },
    amount: [Object],
    machine: { type: String, default: '' },
    absolved: { type: Boolean, default: false }
    
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
