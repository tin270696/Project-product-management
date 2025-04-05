const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [GET] /checkout
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    })

    cart.totalPrice = 0;

    for(const item of cart.products) {
        const infoProduct = await Product.findOne({
            _id: item.product_id
        }).select("thumbnail title price discountPercentage slug stock");

        infoProduct.newPrice = (infoProduct.price * (100 - infoProduct.discountPercentage)/100).toFixed(0);

        infoProduct.totalPrice = infoProduct.newPrice * item.quantity;

        cart.totalPrice += infoProduct.totalPrice;

        item.infoProduct = infoProduct;
    }
    
    res.render("client/pages/checkout/index", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}