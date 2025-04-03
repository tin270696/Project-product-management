const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination.helper");
const systemConfig = require("../../config/system");

// [GET] /admin/trash-can
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: true
    })

    const countRecord = await Product.countDocuments({
        deleted: true
    });
    const objectPagination = paginationHelper(req, countRecord);

    res.render("admin/pages/trash-can/index", {
        pageTitle: "Trang thùng rác",
        products: products,
        countRecord: countRecord,
        objectPagination: objectPagination
    })
}

// [PATCH] /admin/trash-can/restore/:id
module.exports.restore = async (req, res)=> {
    if(!res.locals.role.permissions.includes("trash-can_restore")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/trash-can`);
        return;
    }
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    }, {
        deleted: false
    });
    const info = await Product.findOne({
        _id: id
    })
    req.flash('success', `Khôi phục sản phẩm ${info.title} thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/trash-can`);
}