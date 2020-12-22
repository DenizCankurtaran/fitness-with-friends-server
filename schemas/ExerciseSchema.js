const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    exercise: { type: String, required: true, unique: true },
    description: { type: String },
    preferences: { type: Object, default: { theme: 0 } },
    category: { type: String },
    amount: [Object],
    absolved: { type: Boolean, default: false }
    
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
