const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const pageController = require("./controllers/pageController");

//user action

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/update_account", userController.update_account);

//pages
router.get("/", pageController.home); // home
router.get("/account_page", pageController.account_page);
router.get("/register_page", pageController.register_page);
router.get("/contact_page", pageController.contact_page);
router.get("/login_page", pageController.login_page);
router.get(
  "/success_registration_page",
  pageController.success_registration_page
);

module.exports = router;
