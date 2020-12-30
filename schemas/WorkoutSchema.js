const mongoose = require('mongoose');
const Exercise = require('./ExerciseSchema');

const WorkoutSchema = mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String },
    absolved: { type: Boolean, default: false},
    // exercises: [Exercise]
    exercises: [Object],
    progress: { type: Number, default: 0 },
    level: {type: Number, default: 0},
    cheers: {type: [String], default: []}
    
}, { timestamps: true });

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
