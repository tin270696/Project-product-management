const ProductCategory = require("../../models/product-category.model");

const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.category = async (req, res, next) => {
    const category = await ProductCategory.find({
        deleted: false,
        status: "active"
    })

    const newCategory = createTreeHelper(category);
    res.locals.layoutProductCategory = newCategory;

    next();
}