const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const pageController = require("./controllers/pageController");
const adminController = require("./controllers/adminController");
const middleware = require("./middleware/role");

//user action
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/update_account", userController.update_account);
router.post("/saved-template", userController.saved_template);
//pages
router.get("/", middleware.home_role, pageController.home); // home
router.get("/account-page", middleware.role_user, pageController.account_page);

router.get(
  "/register-page",
  middleware.role_guest,
  pageController.register_page
);
router.get("/contact-page", pageController.contact_page);
router.get("/login-page", middleware.role_guest, pageController.login_page);
router.get("/canvas", middleware.role_user, pageController.canvas);
router.get(
  "/success_registration_page",
  pageController.success_registration_page
);

//admin page
router.get("/dashboard", middleware.role_admin, adminController.dashboard);
router.get("/admin-login", middleware.role_guest, adminController.login_page);
router.get("/admin-templates", adminController.templates);

//user admin action
router.post("/admin-login-request", adminController.admin_login_post);
router.post("/add-template", adminController.add_template);



module.exports = router;
