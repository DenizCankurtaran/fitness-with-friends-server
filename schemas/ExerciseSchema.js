const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    exercise: { type: String, required: true, unique: true }, //pushups
    descripton: { type: String }, // push ups
    // level: { type: String }, // beginner
    category: { type: String }, // chest
    amount: [Object], // {beginner: 10, ...}
    absolved: { type: Boolean, default: false }
    
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
