const express = require("express");
const router = express.Router();
 
const adminController = require("../controllers/adminController");
const check = require("../middleware/role");
 

const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs')
 
const path = require('path')
 




const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null,  'public/images/canvas_image/')
  },
  filename: (req, file, cb)=>{

    let a = file.originalname.replace(/\.[^/.]+$/, "")
    cb(null,a + '-'+ uuidv4()+ path.extname(file.originalname))
   
  }
})
const upload = multer({storage: storage})
 
//admin page
router.get("/dashboard", check.role_admin, adminController.dashboard);
router.get("/admin-login", check.role_guest, adminController.login_page);
router.get("/admin-templates", check.role_admin, adminController.templates);
router.get("/admin-invitations", check.role_admin, adminController.invitation);

router.get("/admin-background", check.role_admin, adminController.background);
router.get("/admin-users", check.role_admin, adminController.users);


//user admin action
router.post("/publish", check.role_admin, adminController.publish_update);

router.post("/admin_delete_template", check.role_admin, adminController.adminDeleteTemplate);

router.post("/admin-login-request", adminController.admin_login_post);

router.post("/add-template",upload.fields([{
  name:'thumbnail_image', maxCount: 1
}, {
  name:'modal_image', maxCount: 1
}]),adminController.add_template);



 

//update
router.post("/updateTemplate" ,upload.fields([{
  name:'thumbnail_image', maxCount: 1
}, {
  name:'modal_image', maxCount: 1
}]),adminController.updateTemplate);

//add background
router.post("/add-background" ,upload.fields([{
  name:'background_image', maxCount: 1
}, {
  name:'thumbnail_image', maxCount: 1
}]),adminController.addBackground);

router.post("/update-background" ,upload.fields([{
  name:'background_image', maxCount: 1
}, {
  name:'thumbnail_image', maxCount: 1
}]),adminController.updateBackground);

router.post("/create-code", check.role_admin, adminController.createCode);
router.post("/delete-code", check.role_admin, adminController.deleteCode);
router.post("/delete_background", check.role_admin, adminController.deleteBackground);



module.exports = router;
