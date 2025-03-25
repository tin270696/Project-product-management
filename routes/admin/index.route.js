const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./products.route");
const trashCanRoutes = require("./trashCan.router");
const systemConfig = require("../../config/system");

module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

    app.use(PATH_ADMIN + "/products", productRoutes);

    app.use(PATH_ADMIN + "/trash-can", trashCanRoutes);
}