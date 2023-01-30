const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// routes
// router.get("/", userController.home);
router.use('/api', require('./users'));
router.use('/api', require('./orders'));

module.exports = router;