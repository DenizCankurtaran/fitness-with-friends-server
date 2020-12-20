const User = require('../schemas/UserSchema');

const createUser = async (data) => {
    const newUser = new User(data);
    let result = await newUser.save().then(user => {
        return [undefined, user];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findUsers = async (query) => {
    let result = await User.find(query).then(users => {
        return [undefined, users];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findUser = async (query) => {
    let result = await User.findOne(query).then(user => {
        return [undefined, user];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findUserById = async (id) => {
    let result = await User.findById(id).then(user => {
        return [undefined, user];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const updateUser = async (id, data) => {
    let result = await User.findByIdAndUpdate(id, data).then(user => {
        return [undefined, user];
    }).catch(err => {
        return  [err, undefined];
    });
    return result;
}

const deleteUser = async (id) => {
    let result = await User.findByIdAndDelete(id).then(user => {
        return [undefined, user];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

module.exports = {
    createUser,
    findUser,
    findUsers,
    findUserById,
    updateUser,
    deleteUser
}
