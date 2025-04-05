const Cart = require("../../models/cart.model");

module.exports.cart = (req, res, next) => {
    if(!req.cookies.cartId) {
        const cart = new Cart();
        cart.save();

        res.cookie("cartId", cart.id);
    }

    next();
}