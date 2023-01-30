const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const orderController = require("../controller/orderController");

// routes
router.post("/add-order", auth, orderController.addOrder);
router.get("/get-order/:userId", auth, orderController.getOrder);


module.exports = router;