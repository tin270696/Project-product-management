const md5 = require("md5");
const User = require("../../models/user.model");

const generateHelper = require("../../helpers/generate.helper");

// [GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    })
}

// [POST] /user/rigister
module.exports.registerPost = async (req, res) => {
    const existUser = await User.findOne({
        email: req.body.email,
        deleted: false
    })

    if(existUser) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }

    const userInfo = {
        fullName: req.body.fullname,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30),
    }

    const user = new User(userInfo);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

// [GET] /user/login/
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

// [POST] /user/login/
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if(user.status != "active") {
        req.flash("error", "Tài khoản bị khóa!");
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password) {
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

// [GET] /user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}