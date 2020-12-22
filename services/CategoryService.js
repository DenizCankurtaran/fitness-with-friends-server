const Category = require('../schemas/CategorySchema');

const createCategory = async (data) => {
    const newCategory = new Category(data);
    let result = await newCategory.save().then(category => {
        return [undefined, category];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findCategory = async (query) => {
    let result = await Category.findOne(query).then(category => {
        return [undefined, category];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const findCategories = async (query) => {
    let result = await Category.find(query).then(categories => {
        return [undefined, categories];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const getAllCategories = async () => {
    let result = await Category.find().then(categories => {
        return [undefined, categories];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}

const updateCategory = async (id, data) => {
    let result = await Category.findByIdAndUpdate(id, data).then(category => {
        return [undefined, category];
    }).catch(err => {
        return  [err, undefined];
    });
    return result;
}

const deleteCategory = async (id) => {
    let result = await Category.findByIdAndDelete(id).then(category => {
        return [undefined, category];
    }).catch(err => {
        return [err, undefined];
    });
    return result;
}


module.exports = {
    createCategory,
    findCategory,
    findCategories,
    getAllCategories,
    updateCategory,
    deleteCategory
}
