const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
 
const pageController = require("../controllers/pageController");
 
const check = require("../middleware/role");
 

const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs')
let formidable = require('formidable');
const path = require('path')

//facebook
const passport = require('passport');
 
 
 




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
// //user action
// router.post("/register", userController.register);
// // router.post("/login", userController.login);
// router.post("/logout", userController.logout);
// router.post("/update_account", userController.update_account);
// // router.post("/saved-template", userController.saved_template);
// router.post("/activateCanvas", check.role_user, userController.activateCanvas);
// router.post("/saveList", check.role_user, userController.saveList);
// router.post("/resetCanvas", check.role_user, userController.resetCanvas)
// router.post("/get-all-background-image", check.queryFromcanvas_role, userController.getAllBackgroundImage);
// router.post("/submit_code", check.role_user, userController.submit_code);
// router.post("/delete_template", check.role_user, userController.deleteTemplate);
// router.post("/get_user_image", check.queryFromcanvas_role, userController.getUserImage);
// router.post("/get_user_image_toCanvas", check.queryFromcanvas_role, userController.getUserImageToCanvas);
// router.post("/delete_user_image", check.queryFromcanvas_role, userController.deleteUserImage);
// router.post("/saved-template",check.saveCanvas_role, function (req, res,next ){
// router.post("/login", userController.login);
 
//  var form = new formidable.IncomingForm();

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

   
//     // const fileInputValue = files.file_input.originalFilename ;

//     // console.log(`Text Input Value: ${textInputValue}`);
    
    
//     res.text_input = fields['text-input'];
//     next()
//   });
 


// }, userController.saved_template );





// router.post("/user_upload_img",check.saveCanvas_role, userController.checkUploadedImages,
// //Process the file upload in Node


// function (req, res,next){
 
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (error, fields, file) {

//     let filepath = file.input_img.filepath;
//     let newpath = 'public/images/users/';
    
//     let a = file.input_img.originalFilename.replace(/\.[^/.]+$/, "")
//     let b = a + uuidv4() + path.extname(file.input_img.originalFilename)
//     newpath += b

  
//     try {
//        //Copy the uploaded file to a custom folder
//     fs.rename(filepath, newpath, function () {
   
//       res.new_path = b
//       res.json(b)
//       res.end();
//       next()
//     //Send a NodeJS file upload confirmation message
 
//   });
    
//     } catch (error) {
//       res.send('error')
//     }
  
//   });

// }, userController.userUploadImg);



//pages
router.get("/development-query", pageController.development_query);
 
router.get("/canvas",  check.role_user, pageController.canvas);
router.get("/", pageController.home); // home
router.get("/account-page", check.role_user, pageController.account_page);
router.get("/templates",  pageController.templates_page);
router.get("/my-templates", check.role_user, pageController.purchased_templates);
router.get("/invitation",   pageController.invitation);
router.get("/canvas-test", check.queryFromcanvas_role, pageController.canvasTest);
router.get(
  "/register-page",
  check.role_guest,
  pageController.register_page
);
router.get("/contact-page", pageController.contact_page);
router.get("/login-page", check.role_guest, pageController.login_page);

router.get(
  "/success_registration_page",
  pageController.success_registration_page
);

 

module.exports = router;
