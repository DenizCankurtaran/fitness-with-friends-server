const mongoose = require('mongoose');
const Exercise = require('./ExerciseSchema');

const WorkoutSchema = mongoose.Schema({
    userId: { type: String, required: true },
    absolved: { type: Boolean, default: false},
    // exercises: [Exercise]
    exercises: [Object]
    
}, { timestamps: true });

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
