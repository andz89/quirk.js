const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

// home
router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/login_page", userController.login_page);
router.get("/register_page", userController.register_page);
router.get("/contact_page", userController.contact_page);

module.exports = router;
