const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

const pageController = require("../controllers/pageController");

const check = require("../middleware/role");

const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");
let formidable = require("formidable");
const path = require("path");

//facebook
const passport = require("passport");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/canvas_image/");
  },
  filename: (req, file, cb) => {
    let a = file.originalname.replace(/\.[^/.]+$/, "");
    cb(null, a + "-" + uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//pages
router.get("/development-query", pageController.development_query);

// router.get("/canvas", check.role_user, pageController.canvas);
router.get("/", pageController.home); // home
router.get("/account-page", check.role_user, pageController.account_page);
router.get("/templates", pageController.templates_page);
router.get(
  "/my-templates",
  check.role_user,
  pageController.purchased_templates
);

// router.get("/canvas", check.queryFromcanvas_role, pageController.canvas);
router.get("/register-page", check.role_guest, pageController.register_page);
router.get("/contact-page", pageController.contact_page);
router.get("/login-page", check.role_guest, pageController.login_page);

router.get(
  "/success_registration_page",
  pageController.success_registration_page
);
router.get("/canvas", check.role_user, pageController.canvasStatic);
router.get("/canvas.html", function (req, res) {
  res.redirect("/");
});
router.get(
  "/fetch_purchased_templates",
  // check.role_user,
  pageController.fetch_purchased_templates
);
router.post(
  "/get_canvas_data",
  check.role_user,
  pageController.get_canvas_data
);
module.exports = router;
