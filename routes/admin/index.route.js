const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./products.route");
const trashCanRoutes = require("./trash-can.router");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./roles.route");
const accountRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");
const authMiddlewares = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(
        PATH_ADMIN + "/dashboard",
        authMiddlewares.requireAuth,
        dashboardRoutes
    );

    app.use(
        PATH_ADMIN + "/products",
        authMiddlewares.requireAuth,
        productRoutes
    );

    app.use(
        PATH_ADMIN + "/trash-can",
        authMiddlewares.requireAuth,
        trashCanRoutes
    );

    app.use(
        PATH_ADMIN + "/product-category",
        authMiddlewares.requireAuth,
        productCategoryRoutes
    );

    app.use(
        PATH_ADMIN + "/roles",
        authMiddlewares.requireAuth,
        roleRoutes
    );

    app.use(
        PATH_ADMIN + "/accounts",
        authMiddlewares.requireAuth,
        accountRoutes
    );

    app.use(PATH_ADMIN + "/auth", authRoutes);
}