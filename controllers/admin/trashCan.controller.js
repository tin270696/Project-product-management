const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /admin/trash-can
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: true
    })

    const countRecord = await Product.countDocuments({
        deleted: true
    });
    const objectPagination = paginationHelper(req, countRecord);

    res.render("admin/pages/trashCan/index", {
        pageTitle: "Trang thùng rác",
        products: products,
        countRecord: countRecord,
        objectPagination: objectPagination
    })
}

// [PATCH] /admin/trash-can/restore/:id
module.exports.restore = async (req, res)=> {
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
    res.redirect("back");
}