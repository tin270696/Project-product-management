const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree.helper");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /admin/product-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const countRecord = await ProductCategory.countDocuments();
    const objectPagination = paginationHelper(req, countRecord);

    const sort = {};
    if(req.query.sortKey &&  req.query.sortValue) {
        sortKey = req.query.sortKey;
        sortValue = req.query.sortValue;
        sort[sortKey] = sortValue;
    }
    else {
        sort.position = "asc";
    }

    const records = await ProductCategory
        .find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)
        .sort(sort)

    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh sách sản phẩm",
        records: records,
        objectPagination: objectPagination
    })
}

// [PATCH] /admin/product-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    if(!res.locals.role.permissions.includes("product-category_edit")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
        return;
    }
    try {
        const status = req.params.status;
        const id = req.params.id;
        await ProductCategory.updateOne({
            _id: id,
            deleted: false
        }, {
            status: status
        });
        console.log(id);
        console.log(status);
        req.flash("success", "Cập nhật trạng thái thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
    }
}

// [PATCH] /admin/product-category/delete/:id
module.exports.delete = async (req, res) => {
    if(!res.locals.role.permissions.includes("product-category_delete")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
        return;
    }
    try {
        const id = req.params.id;
        await ProductCategory.updateOne({
            _id: id
        }, {
            deleted: true
        })
        req.flash("success", "Xóa danh mục thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
    }
}

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }

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
    if(!res.locals.role.permissions.includes("product-category_create")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
        return;
    }
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
    try {
        const record = await ProductCategory.findOne({
            _id: req.params.id,
            deleted: false
        })

        res.render("admin/pages/product-category/detail", {
            pageTitle: "Chi tiết danh mục sản phẩm",
            record: record
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
    }
    
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
    if(!res.locals.role.permissions.includes("product-category_edit")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
        return;
    }
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