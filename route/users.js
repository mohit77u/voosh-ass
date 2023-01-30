const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controller/userController");

// routes
router.post("/add-user", userController.registerNewUser);
router.post("/login-user", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);


module.exports = router;