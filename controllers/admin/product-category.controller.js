const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree.helper");

// [GET] /admin/product-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })

    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh sách sản phẩm",
        records: records
    })
}

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })

    const newRecords = createTreeHelper(records);

    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo mới danh sách sản phẩm",
        records: newRecords
    })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
}