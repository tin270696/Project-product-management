const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res, next) => {
    if(!req.cookies.cartId) {
        const cart = new Cart();
        cart.save();

        res.cookie("cartId", cart.id);
    }
    else {
        const cart = await Cart.findOne({
            _id: req.cookies.cardId
        })

        res.locals.miniCart = cart;
    }

    next();
}