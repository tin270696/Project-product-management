const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require("../../config/system");
const md5 = require("md5");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Account.find(find);

    for(const record of records) {
        const role = await Role.findOne({
            deleted: false,
            _id: record.role_id
        })

        record.roleTitle = role.title;
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles
    })
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    req.body.token = generateHelper.generateRandomString(30);

    const account = new Account(req.body);
    await account.save();

    req.flash("success", "Tạo mới tài khoản thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const account = await Account.findOne({
            _id: id,
            deleted: false
        })

        const role = await Role.findOne({
            _id: account.role_id,
            deleted: false
        })

        account.roleTitle = role.title;

        res.render("admin/pages/accounts/detail", {
            pageTitle: "Thông tin account",
            account: account
        })
    } catch (error) {
        res.render(`/${systemConfig.prefixAdmin}/accounts`);
    }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        
        const data = await Account.findOne({
            _id: id,
            deleted: false
        });

        const roles = await Role.find({
            deleted: false
        })

        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles
        })
    } catch (error) {
        res.render(`/${systemConfig.prefixAdmin}/accounts`);
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        if(req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }
        await Account.updateOne({
            _id: req.params.id,
            deleted: false
        }, req.body)

        req.flash("success", "Cập nhật tài khoản thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}