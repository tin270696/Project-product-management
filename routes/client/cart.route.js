const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/cart.controller");

router.post("/add/:productId", controller.addPost);

router.get("/", controller.index);

router.patch("/delete/:productId", controller.delete);

router.get("/update/:productId/:quantity", controller.updateItem);

module.exports = router;