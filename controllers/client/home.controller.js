const Product = require("../../models/product.model");

// [GET] /
module.exports.index = async (req, res) => {
    const featuredProducts = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6).select("-description");

    for(const product of featuredProducts) {
        product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);
    }

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        featuredProducts: featuredProducts
    });
}