const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    try {
        const cart = await Cart.findOne({
            _id: cartId
        })

        const existProductInCart = cart.products.find(item => item.product_id == productId);

        if(existProductInCart) {
            const updatedQuantity = existProductInCart.quantity + quantity;

            await Cart.updateOne({
                _id: cartId,
                "products.product_id": productId
            }, {
                $set: {"products.$.quantity": updatedQuantity}
            });
        }
        else {
            const objectCart = {
                product_id: productId,
                quantity: quantity
            }

            await Cart.updateOne({
                _id: cartId
            }, {
                $push: {products: objectCart}
            })
        }
        req.flash("success", "Thêm vào giỏ hàng thành công!");

    } catch (error) {
        req.flash("error", "Thêm vào giỏ hàng không thành công!");
    }

    res.redirect("back");
}

// [GET] /cart/
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    })

    cart.totalPrice = 0;

    for(const item of cart.products) {
        const infoProduct = await Product.findOne({
            _id: item.product_id
        }).select("thumbnail slug title price discountPercentage stock");

        infoProduct.newPrice = (infoProduct.price * (100 - infoProduct.discountPercentage)/100).toFixed(0);

        infoProduct.totalPrice = infoProduct.newPrice * item.quantity;

        cart.totalPrice += infoProduct.totalPrice;

        item.infoProduct = infoProduct;
    }

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
}

// [PATCH] /cart/delete/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    try {
        await Cart.updateOne({
            _id: cartId
        }, {
            $pull: {products: {product_id: productId}}
        })
    
        const product = await Product.findOne({
            _id: productId
        }).select("title");
    
        req.flash("success", `Đã xóa ${product.title} khỏi giỏ hàng!`);
        res.redirect("back");
    } catch (error) {
        res.redirect("back");
    }
}

// [GET] /cart/update/:productId/:quantity
module.exports.updateItem = async (req, res) => {
    try {
        const productId = req.params.productId;
        const quantity = req.params.quantity;
        await Cart.updateOne({
            _id: req.cookies.cartId,
            "products.product_id": productId
        }, {
            $set: {"products.$.quantity": quantity}
        })

        req.flash("success", "Cập nhật sản phẩm thành công!");
        res.redirect("back");
    } catch (error) {
        res.redirect("back");
    }
}