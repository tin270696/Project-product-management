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

// [GET] /admin/product-category/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const record = await ProductCategory.findOne({
        _id: id,
        deleted: false
    })

    res.render("admin/pages/product-category/detail", {
        pageTitle: "Chi tiết danh mục sản phẩm",
        record: record
    })
}

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await ProductCategory.findOne({
            _id: id,
            deleted: false
        })

        const allRecords = await ProductCategory.find({
            deleted: false
        })

        const allRecTree = createTreeHelper(allRecords);

        res.render("admin/pages/product-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            record: record,
            allRecords: allRecTree
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
    }
    
}

// [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    try {
        await ProductCategory.updateOne({
            _id: id,
            deleted: false
        }, req.body);

        req.flash("success", "Cập nhật danh mục thành công!");
    } catch (error) {
        req.flash("error", `Cập nhật danh mục không thành công!`);
    }
    
    res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
}