const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./products.route");
const trashCanRoutes = require("./trash-can.router");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./roles.route");
const accountRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

    app.use(PATH_ADMIN + "/products", productRoutes);

    app.use(PATH_ADMIN + "/trash-can", trashCanRoutes);

    app.use(PATH_ADMIN + "/product-category", productCategoryRoutes);

    app.use(PATH_ADMIN + "/roles", roleRoutes);

    app.use(PATH_ADMIN + "/accounts", accountRoutes);

    app.use(PATH_ADMIN + "/auth", authRoutes);
}