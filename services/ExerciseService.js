const Exercise = require('../schemas/ExerciseSchema');

const createExercise = async (data) => {
    const newExercise = new Exercise(data);
    let result = await newExercise.save().then(exercise => {
        return [undefined, exercise];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findExercise = async (query) => {
    let result = await Exercise.findOne(query).then(exercise => {
        return [undefined, exercise];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findExerciseById = async (id) => {
    let result = await Exercise.findById(id).then(exercise => {
        return [undefined, exercise];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const updateExercise = async (id, data) => {
    let result = await Exercise.findByIdAndUpdate(id, data).then(exercise => {
        return [undefined, exercise];
    }).catch(err => {
        return  [err, undefined];
    });
    return result;
}

const deleteExercise = async (id) => {
    let result = await Exercise.findByIdAndDelete(id).then(exercise => {
        return [undefined, exercise];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

module.exports = {
    createExercise,
    findExercise,
    findExerciseById,
    updateExercise,
    deleteExercise
}
