const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const pageController = require("./controllers/pageController");
const adminController = require("./controllers/adminController");
const middleware = require("./middleware/role");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'public/images/ci')
  },
  filename: (req, file, cb)=>{

    let a = file.originalname.replace(/\.[^/.]+$/, "")
    cb(null,a + '-'+ uuidv4()+ path.extname(file.originalname))
   
  }
})
const upload = multer({storage: storage})
//user action
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/update_account", userController.update_account);
router.post("/saved-template", userController.saved_template);
router.post("/activateCanvas", middleware.role_user, userController.activateCanvas);
router.post("/saveList", middleware.role_user, userController.saveList);
router.post("/resetCanvas", middleware.role_user, userController.resetCanvas)
router.post("/get-all-background-image", middleware.role_user, userController.getAllBackgroundImage);
router.post("/submit_code", middleware.role_user, userController.submit_code);


//pages
 
router.get("/canvas",  middleware.role_user, pageController.canvas);
router.get("/", middleware.home_role, pageController.home); // home
router.get("/account-page", middleware.role_user, pageController.account_page);
router.get("/templates", middleware.role_user, pageController.templates_page);
router.get("/purchased-templates", middleware.role_user, pageController.purchased_templates);




router.get(
  "/register-page",
  middleware.role_guest,
  pageController.register_page
);
router.get("/contact-page", pageController.contact_page);
router.get("/login-page", middleware.role_guest, pageController.login_page);

router.get(
  "/success_registration_page",
  pageController.success_registration_page
);

//admin page
router.get("/dashboard", middleware.role_admin, adminController.dashboard);
router.get("/admin-login", middleware.role_guest, adminController.login_page);
router.get("/admin-templates", middleware.role_admin, adminController.templates);
router.get("/admin-background", middleware.role_admin, adminController.background);

//user admin action
router.post("/admin-login-request", adminController.admin_login_post);
router.post("/add-template",upload.single('image') ,adminController.add_template);
router.post("/remove" ,adminController.remove);
router.post("/updateTemplate" ,upload.single('thumbnail-image'),adminController.updateTemplate);
router.post("/add-background" ,upload.fields([{
  name:'background_image', maxCount: 1
}, {
  name:'thumbnail_image', maxCount: 1
}]),adminController.addBackground);




module.exports = router;
