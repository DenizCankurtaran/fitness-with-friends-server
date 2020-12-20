const Workout = require('../schemas/WorkoutSchema');

const createWorkout = async (data) => {
    const newWorkout = new Workout(data);
    let result = await newWorkout.save().then(workout => {
        return [undefined, workout];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findWorkout = async (query) => {
    let result = await Workout.findOne(query).then(workout => {
        return [undefined, workout];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findWorkoutById = async (id) => {
    let result = await Workout.findById(id).then(workout => {
        return [undefined, workout];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const updateWorkout = async (id, data) => {
    let result = await Workout.findByIdAndUpdate(id, data).then(workout => {
        return [undefined, workout];
    }).catch(err => {
        return  [err, undefined];
    });
    return result;
}

const deleteWorkout = async (id) => {
    let result = await Workout.findByIdAndDelete(id).then(workout => {
        return [undefined, workout];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

module.exports = {
    createWorkout,
    findWorkout,
    findWorkoutById,
    updateWorkout,
    deleteWorkout
}
