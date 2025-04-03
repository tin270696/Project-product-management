const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const roles = await Role.find(find);

    res.render("admin/pages/roles/index", {
        pageTitle: "Trang nhóm quyền",
        records: roles
    })
}

// [PATCH] /admin/roles/delete/:id
module.exports.delete = async (req, res) => {
    if(!res.locals.role.permissions.includes("roles_delete")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
        return;
    }
    try {
        const id = req.params.id;
        await Role.updateOne({
            _id: id
        }, {
            deleted: true
        });
        req.flash("success", "Xóa nhóm quyền thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}

// [GET] /admin/roles/create/
module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền"
    })
}

// [POST] /admin/roles/create/
module.exports.createPost = async (req, res) => {
    if(!res.locals.role.permissions.includes("roles_create")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
        return;
    }
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm mới nhóm quyền thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const record = await Role.findOne({
            _id: req.params.id,
            deleted: false
        })
    
        res.render("admin/pages/roles/edit", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            record: record
        })
        
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/`);
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    if(!res.locals.role.permissions.includes("roles_edit")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
        return;
    }
    try {
        const id = req.params.id;
        await Role.updateOne({
            _id : id,
        }, req.body)

        req.flash("success", "Cập nhật nhóm quyền thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        req.flash("error", "Cập nhật nhóm quyền không thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}

// [GET] /admin/roles/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await Role.findOne({
            _id: id,
            deleted: false
        })

        res.render("admin/pages/roles/detail", {
            pageTitle: "Chi tiết nhóm quyền",
            record: record
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Trang phân quyền",
        records: records
    })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    if(!res.locals.role.permissions.includes("roles_permissions")) {
        req.flash("error", "Không có quyền thao tác!");
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
        return;
    }
    try {
        const roles = JSON.parse(req.body.roles);

        for(const role of roles) {
            await Role.updateOne({
                _id: role.id,
                deleted: false
            }, {
                permissions: role.permissions
            });
        }

        req.flash("success", "Cập nhật phân quyền thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles/permissions`);
    } catch (error) {
        req.flash("error", "Cập nhật phân quyền không thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles/permissions`);
    }
}